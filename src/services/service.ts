import { FaqModel } from '../models/faq';
import { CustomerModel } from '../models/customer';
import { SupportTicketModel } from '../models/supportTicket';
import { ChatLogModel } from '../models/chatLog';
import express, { Request, Response } from 'express';
import { db } from '../config/dbconfig';
import { collection, query, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const router = express.Router();

// Chat Log Routes

// Get all chat logs
router.get('/chatlogs', async (req: Request, res: Response) => {
    const chatLogRef = collection(db, 'chatlogs');
    const q = query(chatLogRef);
    try {
      const querySnapshot = await getDocs(q);
      const chatLogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(chatLogs);
    } catch (error) {
      console.error('Error fetching chat logs:', error);
      res.status(500).json({ error: 'Failed to fetch chat logs' });
    }
  });
  
  // Get a single chat log by ID
  router.get('/chatlogs/:id', async (req: Request, res: Response) => {
    const chatLogRef = doc(db, 'chatlogs', req.params.id);
    try {
      const chatLogDoc = await getDoc(chatLogRef);

      if (chatLogDoc.exists()) {
        res.json({ id: chatLogDoc.id, ...chatLogDoc.data() });
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
    const chatLogRef = collection(db, 'chatlogs');
    const newChatLog = req.body;
    try {
      const result = await addDoc(chatLogRef, newChatLog);
      res.status(201).json({ id: result.id });
    } catch (error) {
      console.error('Error creating chat log:', error);
      res.status(500).json({ error: 'Failed to create chat log' });
    }
  });
  
  // Update a chat log
  router.put('/chatlogs/:id', async (req: Request, res: Response) => {
    const chatLogRef = doc(db, 'chatlogs', req.params.id);
    const updatedChatLog = req.body;
    try {
      await updateDoc(chatLogRef, updatedChatLog);
      res.json({ message: 'Chat log updated successfully' });
    } catch (error) {
      console.error('Error updating chat log:', error);
      res.status(500).json({ error: 'Failed to update chat log' });
    }
  });
  
  // Delete a chat log
  router.delete('/chatlogs/:id', async (req: Request, res: Response) => {
    const chatLogRef = doc(db, 'chatlogs', req.params.id);
    try {
      await deleteDoc(chatLogRef);
      res.json({ message: 'Chat log deleted successfully' });
    } catch (error) {
      console.error('Error deleting chat log:', error);
      res.status(500).json({ error: 'Failed to delete chat log' });
    }
  });

//   Customer Routes

// Get all customers
router.get('/customers', async (req: Request, res: Response) => {
    const customerRef = collection(db, 'customers');
    const q = query(customerRef);
    try {
      const querySnapshot = await getDocs(q);
      const customers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  });
  
  // Get a single customer by ID
  router.get('/customers/:id', async (req: Request, res: Response) => {
    const customerRef = doc(db, 'customers', req.params.id);
    try {
      const customerDoc = await getDoc(customerRef);
      if (customerDoc.exists()) {
        res.json({ id: customerDoc.id, ...customerDoc.data() });
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
    const customerRef = collection(db, 'customers');
    const newCustomer = req.body;
    try {
      const result = await addDoc(customerRef, newCustomer);
      res.status(201).json({ id: result.id });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Failed to create customer' });
    }
  });
  
  // Update a customer
  router.put('/customers/:id', async (req: Request, res: Response) => {
    const customerRef = doc(db, 'customers', req.params.id);
    const updatedCustomer = req.body;
    try {
      await updateDoc(customerRef, updatedCustomer);
      res.json({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Failed to update customer' });
    }
  });
  
  // Delete a customer
  router.delete('/customers/:id', async (req: Request, res: Response) => {
    const customerRef = doc(db, 'customers', req.params.id);
    try {
      await deleteDoc(customerRef);
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  });

// FAQ Routes

// Get all FAQs
router.get('/faqs', async (req: Request, res: Response) => {
    const faqsRef = collection(db, 'faqs'); // Reference to the 'faqs' collection
    try {
      const querySnapshot = await getDocs(faqsRef); // Execute the query
      const faqs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(faqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
  });
  
  // Get a single FAQ by ID
  router.get('/faqs/:id', async (req: Request, res: Response) => {
    const faqRef = doc(db, 'faqs', req.params.id); // Reference to the specific FAQ document
    try {
      const faqDoc = await getDoc(faqRef); // Get the document
  
      if (faqDoc.exists()) {
        res.json({ id: faqDoc.id, ...faqDoc.data() });
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
    const faqsRef = collection(db, 'faqs'); // Reference to the 'faqs' collection
    const newFaq = req.body;
  
    try {
      const result = await addDoc(faqsRef, newFaq); // Add a new document with the request body
      res.status(201).json({ id: result.id });
    } catch (error) {
      console.error('Error creating FAQ:', error);
      res.status(500).json({ error: 'Failed to create FAQ' });
    }
  });
  
  // Update an FAQ
  router.put('/faqs/:id', async (req: Request, res: Response) => {
    const faqRef = doc(db, 'faqs', req.params.id); // Reference to the specific FAQ document
    const updatedFaq = req.body;
  
    try {
      await updateDoc(faqRef, updatedFaq); // Update the document with the request body
      res.json({ message: 'FAQ updated successfully' });
    } catch (error) {
      console.error('Error updating FAQ:', error);
      res.status(500).json({ error: 'Failed to update FAQ' });
    }
  });
  
  // Delete an FAQ
  router.delete('/faqs/:id', async (req: Request, res: Response) => {
    const faqRef = doc(db, 'faqs', req.params.id); // Reference to the specific FAQ document
  
    try {
      await deleteDoc(faqRef); // Delete the document
      res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      res.status(500).json({ error: 'Failed to delete FAQ' });
    }
  });

// Support Ticket Routes

// Get all support tickets
router.get('/tickets', async (req: Request, res: Response) => {
    const ticketsRef = collection(db, 'tickets'); // Reference to the 'tickets' collection
    try {
      const querySnapshot = await getDocs(ticketsRef); // Execute the query
      const tickets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  });
  
  // Get a single support ticket by ID
  router.get('/tickets/:id', async (req: Request, res: Response) => {
    const ticketRef = doc(db, 'tickets', req.params.id); // Reference to the specific ticket document
    try {
      const ticketDoc = await getDoc(ticketRef); // Get the document
  
      if (ticketDoc.exists()) {
        res.json({ id: ticketDoc.id, ...ticketDoc.data() });
      } else {
        res.status(404).json({ error: 'ticket not found' });
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      res.status(500).json({ error: 'Failed to fetch ticket' });
    }
  });
  
  // Create a new support ticket
  router.post('/tickets', async (req: Request, res: Response) => {
    const ticketsRef = collection(db, 'tickets'); // Reference to the 'tickets' collection
    const newticket = req.body;
  
    try {
      const result = await addDoc(ticketsRef, newticket); // Add a new document with the request body
      res.status(201).json({ id: result.id });
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ error: 'Failed to create ticket' });
    }
  });
  
  // Update a support ticket
  router.put('/tickets/:id', async (req: Request, res: Response) => {
    const ticketRef = doc(db, 'tickets', req.params.id); // Reference to the specific ticket document
    const updatedticket = req.body;
  
    try {
      await updateDoc(ticketRef, updatedticket); // Update the document with the request body
      res.json({ message: 'ticket updated successfully' });
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ error: 'Failed to update ticket' });
    }
  });
  
  // Delete a support ticket
  router.delete('/tickets/:id', async (req: Request, res: Response) => {
    const ticketRef = doc(db, 'tickets', req.params.id); // Reference to the specific ticket document
  
    try {
      await deleteDoc(ticketRef); // Delete the document
      res.json({ message: 'ticket deleted successfully' });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.status(500).json({ error: 'Failed to delete ticket' });
    }
  });
  