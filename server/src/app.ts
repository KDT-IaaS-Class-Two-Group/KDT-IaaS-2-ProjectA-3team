import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT;
const app = express();

app.use(express.json())//!w 집에서 확인

app.use(express.static(path.join(__dirname, '../../client/dist')));

// /send 경로에 대한 POST 요청 처리
app.post('/send', (req, res) => {
  const { content } = req.body;
  res.json({ content });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
