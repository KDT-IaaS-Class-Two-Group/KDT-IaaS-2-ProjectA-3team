import { MongoClient } from "mongodb";

/**
 * * Function : create
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-07-31
 * Issue : yun-21
 * @function create
 * @description 

 */
async function create() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("notice");
    await database.createCollection("noticeTable");
    console.log("noticeTable 생성 완료");
  } finally {
    await client.close();
  }
}
create().catch(console.dir);
