import mongoose from 'mongoose';
import { connectDB } from './config/db.config';

async function testDatabase() {
    try {
        // Connect to database
        await connectDB();

        // Create a test collection and document
        const testCollection = mongoose.connection.collection('test_collection');
        await testCollection.insertOne({
            test: true,
            createdAt: new Date()
        });

        console.log('Test document created successfully!');
        console.log('Database name:', mongoose.connection.db.databaseName);
        console.log('Collections:', await mongoose.connection.db.listCollections().toArray());

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

testDatabase(); 