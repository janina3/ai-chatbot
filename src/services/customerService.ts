import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { CustomerModel } from '../models/customer';

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

export default router;