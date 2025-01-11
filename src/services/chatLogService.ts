import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { ChatLogModel } from '../models/chatLog';

const router = express.Router();
const uri = "mongodb://<username>:<password>@<host>:<port>/<database_name>"; // Replace with your MongoDB connection string

// Function to connect to MongoDB
async function connectToDatabase(): Promise<MongoClient> {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Get all chat logs
router.get('/chatlogs', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<ChatLogModel>('chatlogs'); 
    const chatLogs = await collection.find({}).toArray();
    res.json(chatLogs);
  } catch (error) {
    console.error('Error fetching chat logs:', error);
    res.status(500).json({ error: 'Failed to fetch chat logs' });
  }
});

// Get a single chat log by ID
router.get('/chatlogs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<ChatLogModel>('chatlogs');
    const chatLog = await collection.findOne({ logId: parseInt(req.params.id) });
    if (chatLog) {
      res.json(chatLog);
    } else {
      res.status(404).json({ error: 'Chat log not found' });
    }
  } catch (error) {
    console.error('Error fetching chat log:', error);
    res.status(500).json({ error: 'Failed to fetch chat log' });
  }
});

// Create a new chat log
router.post('/chatlogs', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<ChatLogModel>('chatlogs');
    const chatLogData = req.body as ChatLogModel; // Type cast request body to ChatLogModel
    const result = await collection.insertOne(chatLogData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error creating chat log:', error);
    res.status(500).json({ error: 'Failed to create chat log' });
  }
});

// Update a chat log
router.put('/chatlogs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<ChatLogModel>('chatlogs');
    const result = await collection.updateOne(
      { logId: parseInt(req.params.id) },
      { $set: req.body } 
    );
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'Chat log not found' });
    } else {
      res.json({ message: 'Chat log updated successfully' });
    }
  } catch (error) {
    console.error('Error updating chat log:', error);
    res.status(500).json({ error: 'Failed to update chat log' });
  }
});

// Delete a chat log
router.delete('/chatlogs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<ChatLogModel>('chatlogs');
    const result = await collection.deleteOne({ logId: parseInt(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Chat log not found' });
    } else {
      res.json({ message: 'Chat log deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting chat log:', error);
    res.status(500).json({ error: 'Failed to delete chat log' });
  }
});

export default router;