import { Injectable } from '@nestjs/common';
import { DbConnect } from '../../database/db_connect/db_connect';

@Injectable()
export class MongoQuery {
  constructor(private readonly dbConnect: DbConnect) {}
  async mongoInsert(dbname: string, type, dbcollection: string, data) {
    const { client } = this.dbConnect;
    const mongoCollection = client
      .db(dbname)
      .collection<typeof type>(dbcollection);
    const result = await mongoCollection.insertOne(data);
    const mongo_obj_id = result.insertedId.toString();
    return mongo_obj_id;
  }
}
