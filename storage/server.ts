import express from "express";
import path from "path";
const cors = require("cors");

const app = express();
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());

app.listen(3003, () => {
  console.log(`Image server is running at http://localhost:3003`);
});
