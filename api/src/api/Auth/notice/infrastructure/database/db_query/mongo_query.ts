import { Injectable } from '@nestjs/common';
import { DbConnect } from '../../database/db_connect/db_connect';

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
}
