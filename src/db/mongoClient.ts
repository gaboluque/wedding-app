import { MongoClient } from "mongodb";
import { mongoUri } from "@/config";

if (!mongoUri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

let mongoClient: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(mongoUri, options);
  }
  mongoClient = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(mongoUri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClient;
