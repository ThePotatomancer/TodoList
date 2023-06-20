import joi from "joi";
import { Task, completionStatus } from '../Types/Task';

export const taskSchema = joi.object<Task>({
    title: joi.string().required(),
    description: joi.string().required(),
    completionStatus: joi.string().required().valid(...completionStatus),
    dueDate: joi.date().optional()
});