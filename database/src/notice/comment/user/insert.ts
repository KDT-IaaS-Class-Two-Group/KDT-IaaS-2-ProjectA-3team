const { MongoClient } = require("mongodb");

import { CommentDTO } from "../../../../../shared/DTO/DbDTO";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function insert(InsertData: CommentDTO) {
  try {
    await client.connect();
    console.log("연결완료");

    const database = client.db("notice");
    const collection = database.collection("comments");

    const result = await collection.insertOne(InsertData);
    console.log(`New document inserted with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

export default insert;