import { MongoClient } from 'mongodb';

class MongoDatabase {
    static uri = "mongodb+srv://shaikrehamanrp:8olXTzYp0Jyym26O@rehaman.ud7vepx.mongodb.net/?retryWrites=true&w=majority&appName=Rehaman";

    constructor(databaseName, collectionName) {
        this.databaseName = databaseName;
        this.collectionName = collectionName;
    }

    connectMongo() {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(MongoDatabase.uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect()
                .then(() => {
                    console.log(`Pinged your database ${this.databaseName} and collection ${this.collectionName}. You successfully connected to MongoDB!`);
                    const database = client.db(this.databaseName);
                    this.collection = database.collection(this.collectionName);
                    resolve(this.collection);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    retrieveAll() {
        return this.connectMongo()
            .then((collection) => collection.find().toArray())
            .then((findResult) => {
                console.log(findResult);
                return findResult;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}

export { MongoDatabase };
