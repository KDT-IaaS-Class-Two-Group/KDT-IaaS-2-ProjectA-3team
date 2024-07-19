import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT;
const app = express();

app.use(express.static(`${process.cwd()}/../client/dist`))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/../client/dist/index.html");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
