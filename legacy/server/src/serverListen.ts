import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const ServerPortNumber = process.env.PORT || 3001;

app.listen(ServerPortNumber, () => {
  console.log(`ServerPort : http://localhost:${ServerPortNumber}`);
});
