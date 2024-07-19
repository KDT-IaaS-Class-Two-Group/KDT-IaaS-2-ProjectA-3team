import express from "express";
import * as dotenv from "dotenv";
import path from "path";


dotenv.config({ path: `${__dirname}/../../.env` });
const port = process.env.PORT;
const app = express();

app.use(express.json()); //! 이거 중요 ... 이거 없으면 안됨. //서버에서 받은 것 (객체 머시기)

app.use(express.static(path.join(__dirname, "../../client/dist")));
// /send 경로에 대한 POST 요청 처리
app.post("/send", (req, res) => { //fetch post로 받은 것 
  const { content } = req.body;
  res.json({ content }); //파싱한 것, 풀어서 읽은 것 클라이언트로 보내는 값
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
