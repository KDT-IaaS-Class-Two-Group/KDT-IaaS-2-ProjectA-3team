import { MongoClient } from "mongodb";
async function create() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("notice");
    await database.createCollection("comments");
    console.log("comments 생성 완료");
  } finally {
    await client.close();
  }
}
create().catch(console.dir);
