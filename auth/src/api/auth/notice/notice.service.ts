import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Pool } from 'pg';
import { NoticeDTO } from '../../../../../shared/DTO/DbDTO';
import { dateSet } from './utils/dateUtils';

@Injectable()
export class NoticeService {
  private readonly uri = 'mongodb://localhost:27017';
  private readonly client = new MongoClient(this.uri);
  private readonly pgPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  async onModuleInit() {
    // 서비스가 초기화될 때 MongoDB에 연결
    await this.client.connect();
    await this.pgPool.connect();
  }
  async onModuleDestroy() {
    // 서비스가 종료될 때 MongoDB 연결 닫기
    await this.client.close();
    await this.pgPool.end();
  }

  async createNotice(noticeDTO: NoticeDTO, user_id: string, role: string) {
    if(role==='employee'){
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
        role,
      };

      const result = await mongoCollection.insertOne(noticeData);
      //새로 생성된 ObjectId를 가져올 수 있다.
      const mongodb_doc_id = result.insertedId.toString();
      //pg 백로그 데이터 삽입 (사실 이게 반복으로 사용되면 함수를 하나 만들어두자)
      const insert = `INSERT INTO notice_back_log (user_id, title, content, mongodb_doc_id, created_at) VALUES ($1, $2, $3, $4, $5)`
      await this.pgPool.query(insert, [
        user_id,
        noticeDTO.title,
        noticeDTO.content,
        mongodb_doc_id,
        custom,
      ]);
      return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
    }
    else if(role === 'admin'){
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeAuthTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
        role,
      };

      const result = await mongoCollection.insertOne(noticeData);
      return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
    }
  }

  async getNotices() {
      const mongoCollection = this.client

        .db('notice')
        .collection<NoticeDTO>('noticeTable');

      // NoticeDTO 타입으로 직접 반환
      console.log(mongoCollection.find().toArray());
      return await mongoCollection.find().toArray();
  }

  async getAuthNotices() {
      const mongoCollection = this.client
        .db('notice')
        .collection<NoticeDTO>('noticeAuthTable');

      // NoticeDTO 타입으로 직접 반환
      return await mongoCollection.find().toArray();
  }

  async updateNotice(id: string, noticeDTO: NoticeDTO, user_id: string, role: string) {
    if (role === 'employee'){
      console.log(user_id);
      const mongoDatabase = this.client.db('notice');
      const mongoCollection = mongoDatabase.collection<NoticeDTO>('noticeTable');
      const checkCollection = mongoDatabase.collection('noticeTable');
      const notice = await checkCollection.findOne({ _id: new ObjectId(id) });
      if(user_id === notice.user_id) {
        const result = await mongoCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: noticeDTO },
          { returnDocument: 'after' } // 업데이트 후 문서 반환
        );
        const updatedDocument = await mongoCollection.findOne({ _id: new ObjectId(id) });
        //새로 생성된 ObjectId를 가져올 수 있다.
        const mongodb_doc_id = updatedDocument._id.toString();
        const updateDate = new Date();
        const custom = dateSet(updateDate);
        const insert = `INSERT INTO notice_back_log (user_id, title, content, mongodb_doc_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`
        await this.pgPool.query(insert, [
          user_id,
          noticeDTO.title,
          noticeDTO.content,
          mongodb_doc_id,
          updatedDocument.createdAt,
          custom,
        ]);
        return `수정 성공`;
      }
      else{
        return `수정 실패`;
      }
    } else if (role === 'admin') {
      const mongoDatabase = this.client.db('notice');
      const mongoCollection = mongoDatabase.collection<NoticeDTO>('noticeAuthTable');
  
      // 업데이트 후 문서 반환
      const result = await mongoCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: noticeDTO },
        { returnDocument: 'after' } // 업데이트 후 문서 반환
      );
      return `수정 성공`;
    }
    return `수정 실패`
  }

  async deleteNotice(id: string, user_id: string, role: string) {
    try {
      const mongoDatabase = this.client.db('notice');
      const mongoUserCollection = mongoDatabase.collection<NoticeDTO>('noticeTable');
  
      // 사용자 컬렉션에서 notice 찾기
      const notice = await mongoUserCollection.findOne({ _id: new ObjectId(id) });
  
      if (role === 'employee') {
        if (!notice) {
          throw new NotFoundException('Notice not found in user table');
        }
  
        const noticeUserId = notice.user_id;
        if (user_id === noticeUserId) {
          const result = await mongoUserCollection.deleteOne({ _id: new ObjectId(id) });
          if (result.deletedCount === 0) {
            throw new NotFoundException('Notice not found in user table');
          }
          //여기부터 다시 고쳐야함
          const mongodb_doc_id = notice._id.toString();
          const DeleteDate = new Date();
          const custom = dateSet(DeleteDate);
          const insert = `INSERT INTO notice_back_log (user_id, title, content, mongodb_doc_id, created_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6)`
          await this.pgPool.query(insert, [
            user_id,
            notice.title,
            notice.content,
            mongodb_doc_id,
            notice.createdAt,
            custom,
          ]);
          return `삭제 성공`;
        } else {
          return `삭제 실패`;
        }
      } else if (role === 'admin') {
        // 관리자 역할일 때
        if (!notice) {
          // 사용자의 notice가 없으면 관리자 테이블에서 찾기
          const mongoAuthCollection = mongoDatabase.collection('noticeAuthTable');
          const authResult = await mongoAuthCollection.deleteOne({ _id: new ObjectId(id) });
  
          if (authResult.deletedCount === 0) {
            throw new NotFoundException('Notice not found in auth table');
          }
  
          return `삭제 성공`;
        } else {
          // 관리자 역할이지만 사용자 테이블에서 notice가 존재하면
          const userResult = await mongoUserCollection.deleteOne({ _id: new ObjectId(id) });
  
          if (userResult.deletedCount === 0) {
            throw new NotFoundException('Notice not found in auth table');
          }
  
          return `Delete successful ${id}`;
        }
      }
  
      return `삭제 실패`; // 역할이 admin이나 employee가 아니면 삭제 실패
    } catch (error) {
      console.error(`Error during delete operation: ${error}`);
      throw error;
    }
  }
}
