import { Injectable } from '@nestjs/common';
import { CommentDTO } from '../../presentation/dto/comment.dto';
import { NoticeRead } from '../notice_db_crud/read_notice/read_notice';
import { MongoQuery } from '../../infrastructure/database/db_query/mongo_query';
import { PostQuery } from '../../infrastructure/database/db_query/postgres_query';
import { dateSet } from '../../infrastructure/utils/dateUtils';
import { ObjectId } from 'mongodb';
import { Role } from '../../Enum/role.enum';

@Injectable()
export class NoticeCommentService {
  constructor(
    private readonly mongoQuery: MongoQuery,
    private readonly postQuery: PostQuery,
    private readonly noticeRead: NoticeRead,
  ) {}
  async getUserhNotices(postId: string, page: number, limit: number) {
    try {
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      const result = await mongoCollection
        .find({ postId })
        .sort({ _id: -1 })
        .skip((page - 1) * limit) // 페이지 계산
        .limit(limit) // 페이지당 항목 수
        .toArray();
      // 총 항목 수를 가져오기 위해 전체 항목 수 쿼리
      const totalCount = await mongoCollection.countDocuments({
        postId: postId,
      });
      const totalPages = Math.ceil(totalCount / limit);
      return { comments: result, totalPages };
    } catch {
      console.error('comment read error');
    }
  }

  async createComment(postId: string, commentDTO: CommentDTO, user_id: string) {
    try {
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      const userResult = await this.postQuery.postSelect(user_id);
      const userId = userResult.rows[0].user_id;
      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const newComment = {
        ...commentDTO,
        postId,
        userId,
        createdAt: custom,
      };
      const result = await mongoCollection.insertOne(newComment);
      return result.insertedId;
    } catch {
      console.error('comment create error');
    }
  }

  async updateComment(postId: string, content: string, user_id: string) {
    try {
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      const id = await this.mongoQuery.mongoFind(mongoCollection, {
        _id: new ObjectId(postId),
      });
      if (user_id === id.userId) {
        const result = await this.mongoQuery.mongoUpdate(
          mongoCollection,
          { _id: new ObjectId(postId) },
          { $set: { content } },
        );
        return result.modifiedCount > 0; //update하면 true반환
      }
      return 'false';
    } catch {
      console.error('comment update error');
    }
  }

  async deleteComment(postId: string, user_id: string, role: string) {
    try {
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      const id = await this.mongoQuery.mongoFind(mongoCollection, {
        _id: new ObjectId(postId),
      });
      if (
        user_id === id.userId ||
        role === Role.Admin ||
        role === Role.SubAdmin
      ) {
        const result = await this.mongoQuery.mongoDelete(mongoCollection, {
          _id: new ObjectId(postId),
        });
        return result.deletedCount > 0;
      }
      return 'false';
    } catch {
      console.error('comment delete error');
    }
  }
}
