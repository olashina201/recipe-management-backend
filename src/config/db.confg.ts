import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = process.env.DATABASE_URL || mongoServer.getUri();
  const conn = await mongoose.connect(mongoUri, {
    dbName: 'test',
    retryWrites: true,
    w: "majority",
  } as ConnectOptions);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
