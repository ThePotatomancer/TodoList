import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { logInfo } from "../../Common/logger";
import { DueTimeChecker } from './dueTimeChecker';
import { scheduleLoop } from "./scheduler";
import { sendNotification } from "./sendNotification";

const port = Number.parseInt(process.env.PORT || "3002");
const connectionString = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/";
const database = "Todo";
const tasksCollection = "tasks";

const MILLISEC_IN_SECOND = 1000;
const checkDelay = MILLISEC_IN_SECOND * 5;

const app = express();
app.use(cors());

const dueTimeChecker = new DueTimeChecker(connectionString, database, tasksCollection);

async function checkForNotifcations(previousTime: number, currentTime: number) {
  const overdueTasks = await dueTimeChecker.getOverdueTasksInRange(previousTime, currentTime);
  if (overdueTasks.length) {
    sendNotification("tasksOverdue", overdueTasks);
  }
}

scheduleLoop(checkForNotifcations, checkDelay);

app.listen(port, () => {
  logInfo(`Notifications service is listening`, {port});
})