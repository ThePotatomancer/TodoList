import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { logInfo } from "../../Common/logger";
import { tasksRouter } from "./tasks.router";
import { TasksProxy } from "./tasks.proxy";

const port = Number.parseInt(process.env.PORT || "3000");
const connectionString = "mongodb://localhost:27017/";
const database = "Todo";
const tasksCollection = "tasks";

const app = express();
app.use(cors());

tasksRouter(app, new TasksProxy(connectionString, database, tasksCollection));

app.listen(port, () => {
  logInfo(`Tasks service is listening`, {port});
})