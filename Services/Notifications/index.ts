import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { logInfo } from "../../Common/logger";

const port = Number.parseInt(process.env.PORT || "3000");

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  logInfo(`Notifications service is listening`, {port});
})