import { DbHandler } from '../../Common/dbHandler';

export class TasksProxy {
    private tasksHandler;
    
    constructor(connectionString: string, database: string, collection: string) {
        this.tasksHandler = new DbHandler(connectionString, database, collection);
    }

    getTasks() {
        
    }

    postTask() {

    }

    editTask() {

    }

    deleteTask() {
        
    }
}