import mongoose from "mongoose";

// MongoDB connection options
const options: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/social_db", options);

    console.log(`
 MongoDB Connected Successfully!
 Database: ${conn.connection.name}
 Host: ${conn.connection.host}
🔌 Port: ${conn.connection.port}
    `);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}; 