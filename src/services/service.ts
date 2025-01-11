import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { FaqModel } from '../models/faq';
import { CustomerModel } from '../models/customer';
import { SupportTicketModel } from '../models/supportTicket';
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

// Chat Log Routes

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

//   Customer Routes

// Get all customers
router.get('/customers', async (req: Request, res: Response) => {
    try {
      const client = await connectToDatabase();
      const database = client.db('your_database_name'); 
      const collection = database.collection<CustomerModel>('customers'); 
      const customers = await collection.find({}).toArray();
      res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  });
  
  // Get a single customer by ID
  router.get('/customers/:id', async (req: Request, res: Response) => {
    try {
      const client = await connectToDatabase();
      const database = client.db('your_database_name'); 
      const collection = database.collection<CustomerModel>('customers');
      const customer = await collection.findOne({ customerId: parseInt(req.params.id) });
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({ error: 'Failed to fetch customer' });
    }
  });
  
  // Create a new customer
  router.post('/customers', async (req: Request, res: Response) => {
    try {
      const client = await connectToDatabase();
      const database = client.db('your_database_name'); 
      const collection = database.collection<CustomerModel>('customers');
      const customerData = req.body as CustomerModel; // Type cast request body to CustomerModel
      const result = await collection.insertOne(customerData);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Failed to create customer' });
    }
  });
  
  // Update a customer
  router.put('/customers/:id', async (req: Request, res: Response) => {
    try {
      const client = await connectToDatabase();
      const database = client.db('your_database_name'); 
      const collection = database.collection<CustomerModel>('customers');
      const result = await collection.updateOne(
        { customerId: parseInt(req.params.id) },
        { $set: req.body } 
      );
      if (result.modifiedCount === 0) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json({ message: 'Customer updated successfully' });
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Failed to update customer' });
    }
  });
  
  // Delete a customer
  router.delete('/customers/:id', async (req: Request, res: Response) => {
    try {
      const client = await connectToDatabase();
      const database = client.db('your_database_name'); 
      const collection = database.collection<CustomerModel>('customers');
      const result = await collection.deleteOne({ customerId: parseInt(req.params.id) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json({ message: 'Customer deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  });

//   FAQ Routes

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

// Support Ticket Routes

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