import express from "express";
import * as dotenv from "dotenv";
import path from "path";
const client = require("./db.js");

const cors = require("cors");
dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${process.cwd()}/../client/dist`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/../client/dist/index.html");
});

app.post("/useDataServeEvent", async (req, res) => {
  const { input } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO input (input) VALUES ($1) RETURNING *",
      [input]
    );
    res
      .status(200)
      .json({ message: "Data saved successfully", input: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
