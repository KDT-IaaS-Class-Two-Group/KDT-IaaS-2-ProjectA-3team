import { Injectable } from '@nestjs/common';
import { DbConnect } from '../../database/db_connect/db_connect';
import { Collection } from 'mongodb';

@Injectable()
export class MongoQuery {
  constructor(private readonly dbConnect: DbConnect) {}
  async mongoConnect(dbname: string, type, dbcollection: string) {
    const { client } = this.dbConnect;
    const collection = client.db(dbname).collection<typeof type>(dbcollection);
    return collection;
  }

  async mongoInsert(mongoCollection, data) {
    const result = await mongoCollection.insertOne(data);
    const mongo_obj_id = result.insertedId.toString();
    return mongo_obj_id;
  }

  async mongoFind(mongoCollection: Collection, filter) {
    const result = mongoCollection.findOne(filter);
    return result;
  }
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

  async mongoDelete(mongoCollection: Collection, id) {
    return await mongoCollection.deleteOne(id);
  }

  async mongoUpdate(mongoCollection: Collection, id, set) {
    return await mongoCollection.updateOne(id, set);
  }
}
