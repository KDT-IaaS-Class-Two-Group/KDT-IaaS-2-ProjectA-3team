import { Injectable } from '@nestjs/common';
import { CommentDTO } from '../../presentation/dto/comment.dto';
import { MongoQuery } from '../../infrastructure/database/db_query/mongo_query';
import { PostQuery } from '../../infrastructure/database/db_query/postgres_query';
import { dateSet } from '../../infrastructure/utils/dateUtils';
import { ObjectId } from 'mongodb';
import { Role } from '../../Enum/role.enum';
/**
 * @class NoticeCommentService
 * @description 공지사항 댓글을 처리하는 서비스 클래스
 * @param {MongoQuery} mongoQuery - MongoDB 관련 쿼리 처리
 * @param {PostQuery} postQuery - PostgreSQL 관련 쿼리 처리
 * @param {NoticeRead} noticeRead - 공지사항 읽기 서비스
 */
@Injectable()
export class NoticeCommentService {
  constructor(
    private readonly mongoQuery: MongoQuery, // MongoDB 관련 쿼리 작업 처리
    private readonly postQuery: PostQuery, // PostgreSQL 관련 쿼리 작업 처리
  ) {}
  /**
   * @method getUserNotices
   * @description 특정 게시물의 댓글을 페이지네이션하여 조회
   * @param {string} postId - 조회할 게시물 ID
   * @param {number} page - 현재 페이지 번호
   * @param {number} limit - 페이지당 표시할 항목 수
   * @returns {Promise<object>} 댓글 목록과 총 페이지 수를 반환
   */
  async getUserhNotices(postId: string, page: number, limit: number) {
    try {
      // MongoDB 'comments' 컬렉션에 연결
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      // 특정 게시물의 댓글을 페이지네이션하여 가져옴
      const result = await mongoCollection
        .find({ postId }) // postId로 필터링
        .sort({ _id: -1 }) // 최신순으로 정렬
        .skip((page - 1) * limit) // 페이지 계산
        .limit(limit) // 페이지당 항목 수
        .toArray();
      // 총 항목 수를 가져오기 위해 전체 항목 수 쿼리
      const totalCount = await mongoCollection.countDocuments({
        postId: postId,
      });
      // 총 페이지 수 계산
      const totalPages = Math.ceil(totalCount / limit);
      return { comments: result, totalPages }; // 댓글과 총 페이지 반환
    } catch {
      console.error('comment read error'); // 에러 처리
    }
  }

  /**
   * @method createComment
   * @description 게시물에 댓글 작성
   * @param {string} postId - 댓글을 작성할 게시물 ID
   * @param {CommentDTO} commentDTO - 댓글 데이터
   * @param {string} user_id - 작성자 ID
   * @returns {Promise<string>} 작성된 댓글의 ID를 반환
   */
  async createComment(postId: string, commentDTO: CommentDTO, user_id: string) {
    try {
      // MongoDB 'comments' 컬렉션에 연결
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      // PostgreSQL에서 사용자 정보를 가져옴
      const userResult = await this.postQuery.postSelect(user_id);
      const userId = userResult.rows[0].user_id;
      // 현재 날짜를 생성
      const currentDate = new Date();
      const custom = dateSet(currentDate);
      // 새 댓글 객체 생성
      const newComment = {
        ...commentDTO,
        postId,
        userId,
        createdAt: custom, // 댓글 작성 날짜 추가
      };
      // 댓글을 MongoDB에 삽입
      const result = await mongoCollection.insertOne(newComment);
      return result.insertedId; // 삽입된 댓글의 ID 반환
    } catch {
      console.error('comment create error'); // 에러 처리
    }
  }

  /**
   * @method updateComment
   * @description 게시물의 댓글 수정
   * @param {string} postId - 수정할 댓글이 속한 게시물 ID
   * @param {string} content - 수정된 댓글 내용
   * @param {string} user_id - 댓글 작성자 ID
   * @returns {Promise<boolean|string>} 댓글 수정 성공 여부 반환
   */
  async updateComment(postId: string, content: string, user_id: string) {
    try {
      // MongoDB 'comments' 컬렉션에 연결
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      // 댓글을 postId로 조회
      const id = await this.mongoQuery.mongoFind(mongoCollection, {
        _id: new ObjectId(postId),
      });
      // 댓글 작성자 확인
      if (user_id === id.userId) {
        const result = await this.mongoQuery.mongoUpdate(
          mongoCollection,
          { _id: new ObjectId(postId) }, // postId로 필터링
          { $set: { content } }, // content 필드 업데이트
        );
        return result.modifiedCount > 0; //update하면 true반환
      }
      return 'false'; // 작성자가 아니면 false 반환
    } catch {
      console.error('comment update error'); // 에러 처리
    }
  }

  /**
   * @method deleteComment
   * @description 게시물의 댓글 삭제
   * @param {string} postId - 삭제할 댓글이 속한 게시물 ID
   * @param {string} user_id - 댓글 작성자 ID
   * @param {string} role - 사용자 역할 (Admin, SubAdmin 등)
   * @returns {Promise<boolean|string>} 댓글 삭제 성공 여부 반환
   */
  async deleteComment(postId: string, user_id: string, role: string) {
    try {
      // MongoDB 'comments' 컬렉션에 연결
      const mongoCollection = await this.mongoQuery.mongoConnect(
        'notice',
        CommentDTO,
        'comments',
      );
      // 댓글을 postId로 조회
      const id = await this.mongoQuery.mongoFind(mongoCollection, {
        _id: new ObjectId(postId),
      });
      // 작성자 또는 관리자 권한 확인
      if (
        user_id === id.userId ||
        role === Role.Admin ||
        role === Role.SubAdmin
      ) {
        // 댓글 삭제
        const result = await this.mongoQuery.mongoDelete(mongoCollection, {
          _id: new ObjectId(postId),
        });
        return result.deletedCount > 0; // 삭제 성공 여부 반환
      }
      return 'false';
    } catch {
      console.error('comment delete error');
    }
  }
}
