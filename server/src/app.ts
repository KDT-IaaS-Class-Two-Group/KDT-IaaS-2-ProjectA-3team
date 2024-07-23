const mongoose = require("mongoose");
import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import bodyParser from "body-parser";
const cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

// Middleware 설정
app.use(cors());
app.use(express.static(path.join(__dirname, "../../client/dist")));

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

const mongoSchema = new mongoose.Schema({
  data: String,
});
const MongoModel = mongoose.model("test", mongoSchema);

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

// 데이터 저장
app.post("/send", async (req, res) => {
  const { content } = req.body;
  res.json({ content }); //! 클라이언트에 보내주는 코드
  try {
    const mongoDoc = new MongoModel({ data: content });
    const savedDoc = await mongoDoc.save();
    console.log("MongoDB data saved:", savedDoc); // 로그 추가

    res.status(200).send("Data saved successfully");
    const result = await pool.query(
      "INSERT INTO realtest (content) VALUES ($1)",
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
