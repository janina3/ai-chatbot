import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { FaqModel } from '../models/faq';

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

// Get all FAQs
router.get('/faqs', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<FaqModel>('faqs'); 
    const faqs = await collection.find({}).toArray();
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get a single FAQ by ID
router.get('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<FaqModel>('faqs');
    const faq = await collection.findOne({ faqId: parseInt(req.params.id) });
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ error: 'FAQ not found' });
    }
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
});

// Create a new FAQ
router.post('/faqs', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<FaqModel>('faqs');
    const faqData = req.body as FaqModel; // Type cast request body to FaqModel
    const result = await collection.insertOne(faqData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// Update an FAQ
router.put('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<FaqModel>('faqs');
    const result = await collection.updateOne(
      { faqId: parseInt(req.params.id) },
      { $set: req.body } 
    );
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'FAQ not found' });
    } else {
      res.json({ message: 'FAQ updated successfully' });
    }
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// Delete an FAQ
router.delete('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('your_database_name'); 
    const collection = database.collection<FaqModel>('faqs');
    const result = await collection.deleteOne({ faqId: parseInt(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'FAQ not found' });
    } else {
      res.json({ message: 'FAQ deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

export default router;