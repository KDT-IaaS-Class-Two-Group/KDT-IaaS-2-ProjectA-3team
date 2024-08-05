const { MongoClient } = require("mongodb");

import { NoticeDTO } from "../../../shared/DTO/DbDTO";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

/**
 * * Function : insert
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-07-31
 * Issue : yun-21
 * @function insert
 * @description
 * @param InsertData:NoticeDTO
 */

async function insert(InsertData: NoticeDTO) {
  try {
    await client.connect();
    console.log("연결완료");

    const database = client.db("notice");
    const collection = database.collection("noticeTable");

    const result = await collection.insertOne(InsertData);
    console.log(`New document inserted with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

export default insert;