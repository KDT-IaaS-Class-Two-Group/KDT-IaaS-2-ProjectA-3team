import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../client/dist')));
app.use(express.static(path.resolve(__dirname, '../../client/public')));

app.post('/login', (req, res) => {
  // 엔드포인트 정의
  console.log(req.body);
})

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, '../../client/public/index.html');
  console.log('Serving file from:', filePath);
  res.sendFile(filePath);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
