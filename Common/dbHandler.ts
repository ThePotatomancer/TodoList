import { Collection, Db, MongoClient, Document } from "mongodb";

export class DbHandler<T extends Document> {
    client: MongoClient;
    database: Db;
    collection: Collection<T>;

    constructor(connectionString: string, database: string, collection: string) {
        this.client = new MongoClient(connectionString);
        this.database = this.client.db(database);
        this.collection = this.database.collection(collection);
    }

    cleanup() {
        this.client.close();
    }
}