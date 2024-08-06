import { MongoClient } from 'mongodb';

class MongoDatabase {
    static uri = "mongodb+srv://shaikrehamanrp:8olXTzYp0Jyym26O@rehaman.ud7vepx.mongodb.net/?retryWrites=true&w=majority&appName=Rehaman"
    constructor(databaseName, collectionName) {
        this.databaseName = databaseName
        this.collectionName = collectionName
    }

    async connectMongo() {
        try {
            this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await this.client.connect();
            console.log(`Pinged your database ${this.databaseName} and collection ${this.collectionName}. You successfully connected to MongoDB!`);
            const database = client.db(databaseName);
            this.collection = database.collection(collectionName);
        } catch (error) {
            console.log(error);
        }
    }

    async retrieveAll() {
        const findResult = await this.collection.find().toArray();
        console.log(findResult);
        return findResult;
    }
}


const db = new MongoDatabase("Epiclife", "Finance")
db.retrieveAll()


export { MongoDatabase };
