import {Express} from "express";
import { TasksProxy } from "./tasks.proxy";

// TODO: Seperate interface from implementaion
export const tasksRouter = (app: Express, tasksProxy: TasksProxy) => {
    app.get('/tasks', (req, res) => {
        res.status(200);
      })
    app.post("/task", (req, res) => {
        res.status(200);
    })
    app.patch("/task", (req, res) => {
        res.status(200);
    })
    app.delete("/task", (req, res) => {
        res.status(200);
    })
}