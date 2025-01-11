import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { SupportTicketModel } from '../models/supportTicket';

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

// Get all support tickets
router.get('/tickets', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<SupportTicketModel>('tickets'); 
    const tickets = await collection.find({}).toArray();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    res.status(500).json({ error: 'Failed to fetch support tickets' });
  }
});

// Get a single support ticket by ID
router.get('/tickets/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<SupportTicketModel>('tickets');
    const ticket = await collection.findOne({ ticketId: parseInt(req.params.id) });
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Support ticket not found' });
    }
  } catch (error) {
    console.error('Error fetching support ticket:', error);
    res.status(500).json({ error: 'Failed to fetch support ticket' });
  }
});

// Create a new support ticket
router.post('/tickets', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<SupportTicketModel>('tickets');
    const ticketData = req.body as SupportTicketModel; // Type cast request body to SupportTicketModel
    const result = await collection.insertOne(ticketData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error creating support ticket:', error);
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
});

// Update a support ticket
router.put('/tickets/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<SupportTicketModel>('tickets');
    const result = await collection.updateOne(
      { ticketId: parseInt(req.params.id) },
      { $set: req.body } 
    );
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'Support ticket not found' });
    } else {
      res.json({ message: 'Support ticket updated successfully' });
    }
  } catch (error) {
    console.error('Error updating support ticket:', error);
    res.status(500).json({ error: 'Failed to update support ticket' });
  }
});

// Delete a support ticket
router.delete('/tickets/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<SupportTicketModel>('tickets');
    const result = await collection.deleteOne({ ticketId: parseInt(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Support ticket not found' });
    } else {
      res.json({ message: 'Support ticket deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting support ticket:', error);
    res.status(500).json({ error: 'Failed to delete support ticket' });
  }
});

export default router;