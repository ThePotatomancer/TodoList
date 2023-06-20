import { ObjectId, WithId } from 'mongodb';
import { DbHandler } from '../../Common/dbHandler';
import { Task } from '../../Types/Task';

export class TasksProxy {
    private tasksHandler;
    
    constructor(connectionString: string, database: string, collection: string) {
        this.tasksHandler = new DbHandler<Task>(connectionString, database, collection);
    }

    async getTasks(): Promise<Task[]> {
        // TODO: add limit and pagination
        const cursor = this.tasksHandler.collection.find();
        const tasks = await cursor.toArray();
        cursor.close();
        return tasks;
    }

    async postTask(task: Task) {
        return this.tasksHandler.collection.insertOne(task);
    }

    async editTask(task: WithId<Task>) {
        return this.tasksHandler.collection.replaceOne({ _id: task._id }, task);
    }

    async deleteTask(_id: ObjectId) {
        return this.tasksHandler.collection.deleteOne({ _id });
    }
}