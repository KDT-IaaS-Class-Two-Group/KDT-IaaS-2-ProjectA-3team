import { Client } from "pg";
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "3662",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connect to postgres"))
  .catch((err) => console.error("Connection error", err.stack));

export default client;
