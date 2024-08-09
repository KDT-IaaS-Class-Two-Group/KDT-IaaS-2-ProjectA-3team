const { MongoClient } = require("mongodb");

import { NoticeDTO } from "../../../../../shared/DTO/DbDTO";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function insert(InsertData: NoticeDTO) {
  try {
    await client.connect();
    console.log("연결완료");

    const database = client.db("notice");
    const collection = database.collection("noticeAuthTable");

    const result = await collection.insertOne(InsertData);
    console.log(`New document inserted with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

export default insert;