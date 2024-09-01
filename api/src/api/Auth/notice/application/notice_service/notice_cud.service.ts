import { Injectable } from '@nestjs/common';
import { Role } from '../../Enum/role.enum';
import { NoticeDTO } from '../../presentation/dto/notice.dto';
import { NoticeCreate } from '../notice_db_crud/create_notice/create_notice';
import { dateSet } from '../../infrastructure/utils/dateUtils';
import { MongoQuery } from '../../infrastructure/database/db_query/mongo_query';
import { ObjectId } from 'mongodb';
import { PostQuery } from '../../infrastructure/database/db_query/postgres_query';

@Injectable()
export class NoticeCUDService {
  constructor(
    private readonly mongoQuery: MongoQuery,
    private readonly postQuery: PostQuery,
    private readonly noticeCreate: NoticeCreate,
  ) {}
  async createNotice(noticeDTO: NoticeDTO, user_id: string, role: string) {
    if (role === Role.Employee || role === Role.Leader) {
      await this.noticeCreate.noticeCreate(
        noticeDTO,
        'noticeTable',
        dateSet,
        user_id,
        role,
      );
    } else if (role === Role.Admin || role === Role.SubAdmin) {
      await this.noticeCreate.noticeCreate(
        noticeDTO,
        'noticeAuthTable',
        dateSet,
        user_id,
        role,
      );
    }
  }

  async updateNotice(
    id: string,
    noticeDTO: NoticeDTO,
    user_id: string,
    role: string,
  ) {
    try {
      const mongoUserCollection = await this.mongoQuery.mongoConnect(
        'notice',
        NoticeDTO,
        'noticeTable',
      );
      const mongoAuthCollection = await this.mongoQuery.mongoConnect(
        'notice',
        NoticeDTO,
        'noticeAuthTable',
      );

      const userNotice = await this.mongoQuery.mongoFind(mongoUserCollection, {
        _id: new ObjectId(id),
      });
      let authNotice = null;

      if (!userNotice) {
        authNotice = await this.mongoQuery.mongoFind(mongoAuthCollection, {
          _id: new ObjectId(id),
        });
      }

      if (userNotice) {
        if (role === Role.Employee || role === Role.Leader) {
          const currentDate = new Date();
          const custom = dateSet(currentDate);
          const updateSet = {
            ...noticeDTO,
            updatedAt: custom,
          };

          if (user_id === userNotice.user_id) {
            await this.mongoQuery.mongoFindAndUpdate(
              mongoUserCollection,
              { _id: new ObjectId(id) },
              { $set: updateSet },
              { returnDocument: 'after' },
            );

            const mongodb_doc_id = userNotice._id.toString();
            const rowData = [
              'user_id',
              'title',
              'content',
              'mongodb_doc_id',
              'created_at',
              'updated_at',
            ];
            const insertData = [
              user_id,
              noticeDTO.title,
              noticeDTO.content,
              mongodb_doc_id,
              userNotice.createdAt,
              custom,
            ];
            await this.postQuery.postInsert(
              'notice_back_log',
              rowData,
              insertData,
            );
            return `수정 성공`;
          }
          return `수정 실패`;
        }
      } else if (authNotice) {
        if (role === Role.Admin || role === Role.SubAdmin) {
          await this.mongoQuery.mongoFindAndUpdate(
            mongoAuthCollection,
            { _id: new ObjectId(id) },
            { $set: noticeDTO },
            { returnDocument: 'after' },
          );
          return `수정 성공`;
        }
        return `공지사항 수정 권한이 없습니다.`;
      }

      return `수정 실패`;
    } catch (error) {
      return `서버에서 오류가 발생했습니다. ${error}`;
    }
  }

  async deleteNotice(id: string, user_id: string, role: string) {
    try {
      const mongoUserCollection = await this.mongoQuery.mongoConnect(
        'notice',
        NoticeDTO,
        'noticeTable',
      );
      // 사용자 컬렉션에서 notice 찾기
      const notice = await this.mongoQuery.mongoFind(mongoUserCollection, {
        _id: new ObjectId(id),
      });

      if (role === Role.Employee || role === Role.Leader) {
        const noticeUserId = notice.user_id;
        if (user_id === noticeUserId) {
          await this.mongoQuery.mongoDelete(mongoUserCollection, {
            _id: new ObjectId(id),
          });
          const mongodb_doc_id = notice._id.toString();
          const DeleteDate = new Date();
          const custom = dateSet(DeleteDate);
          const rowData = [
            'user_id',
            'title',
            'content',
            'mongodb_doc_id',
            'created_at',
            'updated_at',
            'deleted_at',
          ];
          const insertData = [
            user_id,
            notice.title,
            notice.content,
            mongodb_doc_id,
            notice.createdAt,
            custom,
          ];
          await this.postQuery.postInsert(
            'notice_back_log',
            rowData,
            insertData,
          );
          return `삭제 성공`;
        } else {
          return `삭제 실패`;
        }
      } else if (role === Role.Admin || role === Role.SubAdmin) {
        // 관리자 역할일 때
        if (!notice) {
          // 사용자의 notice가 없으면 관리자 테이블에서 찾기
          const mongoAuthCollection = await this.mongoQuery.mongoConnect(
            'notice',
            NoticeDTO,
            'noticeAuthTable',
          );
          await this.mongoQuery.mongoDelete(mongoAuthCollection, {
            _id: new ObjectId(id),
          });

          return `삭제 성공`;
        } else {
          // 관리자 역할이지만 사용자 테이블에서 notice가 존재하면
          await this.mongoQuery.mongoDelete(mongoUserCollection, {
            _id: new ObjectId(id),
          });

          return `삭제 성공`;
        }
      }
      return `삭제 실패`; // 역할이 admin이나 employee가 아니면 삭제 실패
    } catch (error) {
      return `서버에서 오류가 발생했습니다. ${error}`;
    }
  }
}
