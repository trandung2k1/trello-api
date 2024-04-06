import { MongoClient, ServerApiVersion } from 'mongodb';
let databaseInstance = null;
export const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const connectDB = async () => {
    await client.connect();
    databaseInstance = client.db('trello-api');
    // try {
    //     await client.connect();
    //     databaseInstance = client.db('trello-api');
    //     // return 'Connected MongoDB successfully';
    // } catch (error) {
    //     console.log(error);
    //     // return 'Connected MongoDB failed.';
    // } finally {
    //     await client.close();
    // }
};
export const getDatabaseInstance = () => {
    if (!databaseInstance) throw new Error('Must connect to database firts!');
    return databaseInstance;
};
export default connectDB;
