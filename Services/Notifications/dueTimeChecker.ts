import { DbHandler } from "../../Common/dbHandler";
import { Task } from "../../Types/Task";

export class DueTimeChecker {
    tasksHandler: DbHandler<Task>;

    constructor(connectionString: string, database: string, collection: string) {
        this.tasksHandler = new DbHandler(connectionString, database, collection);
    }

    async getOverdueTasks(checkedAgainstTime: number) {
        const cursor = this.tasksHandler.collection.find({dueDate: {"$gte": checkedAgainstTime}});
        const tasks = await cursor.toArray();
        cursor.close();
        return tasks;
    }

    async getOverdueTasksInRange(minimalTime: number, checkedAgainstTime: number) {
        const cursor = this.tasksHandler.collection.find({dueDate: {"$gte": checkedAgainstTime, "$lte": minimalTime}});
        const tasks = await cursor.toArray();
        cursor.close();
        return tasks;
    }
}