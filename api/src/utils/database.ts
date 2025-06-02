// database.js - MongoDB connection for your API
import { MongoClient, Db } from "mongodb";

class DatabaseManager {
  private client: MongoClient | null;
  private db: Db | null;
  private connectionString: string;
  private dbName: string;

  constructor() {
    this.client = null;
    this.db = null;

    // Use the API user credentials
    this.connectionString =
      process.env.MONGO_API_CONNECTION_STRING ||
      `mongodb://${process.env.MONGO_API_USER}:${process.env.MONGO_API_PASSWORD}@mongodb:27017/${process.env.MONGO_DATABASE_NAME}`;

    this.dbName = process.env.MONGO_DATABASE_NAME || "website_prod";
  }

  async connect() {
    try {
      this.client = new MongoClient(this.connectionString, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
      });

      await this.client.connect();
      this.db = this.client.db(this.dbName);

      console.log("Connected to MongoDB with API user");
      return this.db;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  // Health check method
  async healthCheck() {
    try {
      await this.client?.db("admin").admin().ping();
      return true;
    } catch (error) {
      console.error("MongoDB health check failed:", error);
      return false;
    }
  }
}

// Singleton instance
const dbManager = new DatabaseManager();
const connectToDatabase = () => dbManager.connect();

export { dbManager, connectToDatabase };

// Example usage in your API routes:
/*
import { dbManager, connectToDatabase } from './database';

// Example usage in your API routes:
/*
const { getDatabase } = require('./database');

app.get('/api/users', async (req, res) => {
  try {
    const db = getDatabase();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});
*/
