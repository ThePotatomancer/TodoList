import joi, { ValidationResult } from "joi";
import { Express } from "express";
import { ObjectId } from 'mongodb';
import { TasksProxy } from "./tasks.proxy";
import { taskSchema } from '../../Schemas/Task.schema';
import { logError } from "../../Common/logger";
import { Task } from "../../Types/Task";

// TODO: Seperate interface from implementaion
export const tasksRouter = (app: Express, tasksProxy: TasksProxy) => {
    app.get('/tasks', async (req, res) => {
        const tasks = await tasksProxy.getTasks();
        res.json(tasks);
    });

    app.post("/task", async (req, res) => {
        const unvalidatedBody = req.body;
        const bodySchema = joi.object<{task: Task}>({task: taskSchema});
        const validationResult = bodySchema.validate(unvalidatedBody);

        if (validationResult.error) {
            // TODO: return errors to client
            logError("body failed schema validation", {route: "/tasks", ...validationResult});
            res.status(400);
        } else {
            await tasksProxy.postTask(validationResult.value.task);
            res.status(200);
        }
    });

    app.patch("/task", async (req, res) => {
        const unvalidatedBody = req.body;
        const bodySchema = joi.object<{task: Task & {_id: string}}>({task: taskSchema.append({_id: joi.string()})});
        const taskValidationResult = bodySchema.validate(unvalidatedBody);

        if (taskValidationResult.error) {
            // TODO: return errors to client
            logError("body failed schema validation", {route: "/tasks", ...taskValidationResult});
            res.status(400);
        } else {
            const task = taskValidationResult.value.task;
            const objectId = new ObjectId(task._id);
            await tasksProxy.editTask({...task, _id: objectId});
            res.status(200);
        }
        res.status(200);
    });

    app.delete("/task/:id", async (req, res) => {
        await tasksProxy.deleteTask(new ObjectId(req.params.id));
        res.status(200);
    });
}