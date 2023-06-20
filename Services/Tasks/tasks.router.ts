import joi, { ValidationResult } from "joi";
import { Express } from "express";
import { ObjectId } from 'mongodb';
import { TasksProxy } from "./tasks.proxy";
import { taskSchema } from '../../Schemas/Task.schema';
import { logError } from "../../Common/logger";
import { Task } from "../../Types/Task";

export const tasksRouter = (app: Express, tasksProxy: TasksProxy) => {
    app.get('/tasks', async (req, res) => {
        try {
            const tasks = await tasksProxy.getTasks();
            res.json(tasks).status(200);
        }
        catch(error) {
            logError("error during db operation", {error, route: "GET/tasks"})
            res.status(500);
        }
    });

    app.post("/task", async (req, res) => {
        const unvalidatedBody = req.body;
        const bodySchema = joi.object<{task: Task}>({task: taskSchema});
        const validationResult = bodySchema.validate(unvalidatedBody);

        if (validationResult.error) {
            // TODO: return proper errors to client
            logError("body failed schema validation", {route: "POST/task", ...validationResult});
            res.status(400);
        } else {
            try {
                await tasksProxy.postTask(validationResult.value.task);
                res.status(200);
            } catch (error) {
                logError("error during db operation", {error, route: "POST/task", data: validationResult.value.task})
                res.status(500);
            }
        }
    });

    app.patch("/task", async (req, res) => {
        const unvalidatedBody = req.body;
        const bodySchema = joi.object<{task: Task & {_id: string}}>({task: taskSchema.append({_id: joi.string()})});
        const validationResult = bodySchema.validate(unvalidatedBody);

        if (validationResult.error) {
            // TODO: return errors to client
            logError("body failed schema validation", {route: "PUT/task", ...validationResult});
            res.status(400);
        } else {
            const task = validationResult.value.task;
            const objectId = new ObjectId(task._id);
            try {
                await tasksProxy.editTask({...task, _id: objectId});
                res.status(200);
            }
            catch(error) {
                logError("error during db operation", {error, route: "PUT/task", data: task})
                res.status(500);
            }
        }
    });

    app.delete("/task/:id", async (req, res) => {
        try {
            await tasksProxy.deleteTask(new ObjectId(req.params.id));
            res.status(200);
        }
        catch(error) {
            logError("error during db operation", {error, route: "DELETE/task/:id", data: req.params})
            res.status(500);
        }
    });
}