import { Injectable } from '@nestjs/common';
import { DbConnect } from '../../database/db_connect/db_connect';
import { Collection } from 'mongodb';
/**
 * @class MongoQuery
 * @description MongoDB와의 상호작용을 처리하는 서비스 클래스입니다. MongoDB 데이터베이스와 컬렉션에 대한 다양한 작업을 제공합니다.
 */
@Injectable()
export class MongoQuery {
  constructor(private readonly dbConnect: DbConnect) {}

  /**
   * MongoDB 데이터베이스와 컬렉션을 연결합니다.
   * @param {string} dbname - 연결할 데이터베이스의 이름.
   * @param {any} type - 컬렉션의 타입 (MongoDB에서 사용하는 타입).
   * @param {string} dbcollection - 연결할 컬렉션의 이름.
   * @returns {Promise<Collection>} - MongoDB 컬렉션 객체를 반환합니다.
   */
  async mongoConnect(dbname: string, type, dbcollection: string) {
    const { client } = this.dbConnect;
    const collection = client.db(dbname).collection<typeof type>(dbcollection);
    return collection;
  }
  /**
   * MongoDB 컬렉션에 문서를 삽입합니다.
   * @param {Collection} mongoCollection - 문서를 삽입할 MongoDB 컬렉션.
   * @param {any} data - 삽입할 문서 데이터.
   * @returns {Promise<string>} - 삽입된 문서의 MongoDB Object ID를 문자열로 반환합니다.
   */
  async mongoInsert(mongoCollection, data) {
    const result = await mongoCollection.insertOne(data);
    const mongo_obj_id = result.insertedId.toString();
    return mongo_obj_id;
  }

  /**
   * MongoDB 컬렉션에서 필터에 맞는 문서를 찾습니다.
   * @param {Collection} mongoCollection - 문서를 검색할 MongoDB 컬렉션.
   * @param {any} filter - 검색할 문서의 필터 조건.
   * @returns {Promise<any>} - 찾은 문서 객체를 반환합니다.
   */
  async mongoFind(mongoCollection: Collection, filter) {
    const result = mongoCollection.findOne(filter);
    return result;
  }

  /**
   * MongoDB 컬렉션에서 문서를 찾고 업데이트합니다.
   * @param {Collection<Document>} mongoCollection - 문서를 검색하고 업데이트할 MongoDB 컬렉션.
   * @param {any} filter - 업데이트할 문서를 찾기 위한 필터 조건.
   * @param {any} update - 문서 업데이트에 사용할 업데이트 조건.
   * @param {any} option - 업데이트 옵션.
   * @returns {Promise<any>} - 업데이트 결과를 반환합니다.
   */
  async mongoFindAndUpdate(
    mongoCollection: Collection<Document>,
    filter,
    update,
    option,
  ) {
    const result = await mongoCollection.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return result;
  }

  /**
   * MongoDB 컬렉션에서 문서를 삭제합니다.
   * @param {Collection} mongoCollection - 문서를 삭제할 MongoDB 컬렉션.
   * @param {any} id - 삭제할 문서의 필터 조건 (보통 Object ID).
   * @returns {Promise<any>} - 삭제 결과를 반환합니다.
   */
  async mongoDelete(mongoCollection: Collection, id) {
    return await mongoCollection.deleteOne(id);
  }

  /**
   * MongoDB 컬렉션에서 문서를 업데이트합니다.
   * @param {Collection} mongoCollection - 문서를 업데이트할 MongoDB 컬렉션.
   * @param {any} id - 업데이트할 문서의 필터 조건 (보통 Object ID).
   * @param {any} set - 문서 업데이트에 사용할 업데이트 조건.
   * @returns {Promise<any>} - 업데이트 결과를 반환합니다.
   */
  async mongoUpdate(mongoCollection: Collection, id, set) {
    return await mongoCollection.updateOne(id, set);
  }
}
