"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
const uri = "mongodb://<username>:<password>@<host>:<port>/<database_name>"; // Replace with your MongoDB connection string
// Function to connect to MongoDB
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            console.log('Connected to MongoDB');
            return client;
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    });
}
// Chat Log Routes
// Get all chat logs
router.get('/chatlogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('chatlogs');
        const chatLogs = yield collection.find({}).toArray();
        res.json(chatLogs);
    }
    catch (error) {
        console.error('Error fetching chat logs:', error);
        res.status(500).json({ error: 'Failed to fetch chat logs' });
    }
}));
// Get a single chat log by ID
router.get('/chatlogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('chatlogs');
        const chatLog = yield collection.findOne({ logId: parseInt(req.params.id) });
        if (chatLog) {
            res.json(chatLog);
        }
        else {
            res.status(404).json({ error: 'Chat log not found' });
        }
    }
    catch (error) {
        console.error('Error fetching chat log:', error);
        res.status(500).json({ error: 'Failed to fetch chat log' });
    }
}));
// Create a new chat log
router.post('/chatlogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('chatlogs');
        const chatLogData = req.body; // Type cast request body to ChatLogModel
        const result = yield collection.insertOne(chatLogData);
        res.status(201).json({ insertedId: result.insertedId });
    }
    catch (error) {
        console.error('Error creating chat log:', error);
        res.status(500).json({ error: 'Failed to create chat log' });
    }
}));
// Update a chat log
router.put('/chatlogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('chatlogs');
        const result = yield collection.updateOne({ logId: parseInt(req.params.id) }, { $set: req.body });
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Chat log not found' });
        }
        else {
            res.json({ message: 'Chat log updated successfully' });
        }
    }
    catch (error) {
        console.error('Error updating chat log:', error);
        res.status(500).json({ error: 'Failed to update chat log' });
    }
}));
// Delete a chat log
router.delete('/chatlogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('chatlogs');
        const result = yield collection.deleteOne({ logId: parseInt(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Chat log not found' });
        }
        else {
            res.json({ message: 'Chat log deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting chat log:', error);
        res.status(500).json({ error: 'Failed to delete chat log' });
    }
}));
//   Customer Routes
// Get all customers
router.get('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('customers');
        const customers = yield collection.find({}).toArray();
        res.json(customers);
    }
    catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
}));
// Get a single customer by ID
router.get('/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('customers');
        const customer = yield collection.findOne({ customerId: parseInt(req.params.id) });
        if (customer) {
            res.json(customer);
        }
        else {
            res.status(404).json({ error: 'Customer not found' });
        }
    }
    catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
}));
// Create a new customer
router.post('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('customers');
        const customerData = req.body; // Type cast request body to CustomerModel
        const result = yield collection.insertOne(customerData);
        res.status(201).json({ insertedId: result.insertedId });
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
}));
// Update a customer
router.put('/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('customers');
        const result = yield collection.updateOne({ customerId: parseInt(req.params.id) }, { $set: req.body });
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Customer not found' });
        }
        else {
            res.json({ message: 'Customer updated successfully' });
        }
    }
    catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Failed to update customer' });
    }
}));
// Delete a customer
router.delete('/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('customers');
        const result = yield collection.deleteOne({ customerId: parseInt(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Customer not found' });
        }
        else {
            res.json({ message: 'Customer deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
}));
//   FAQ Routes
// Get all FAQs
router.get('/faqs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('faqs');
        const faqs = yield collection.find({}).toArray();
        res.json(faqs);
    }
    catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
}));
// Get a single FAQ by ID
router.get('/faqs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('faqs');
        const faq = yield collection.findOne({ faqId: parseInt(req.params.id) });
        if (faq) {
            res.json(faq);
        }
        else {
            res.status(404).json({ error: 'FAQ not found' });
        }
    }
    catch (error) {
        console.error('Error fetching FAQ:', error);
        res.status(500).json({ error: 'Failed to fetch FAQ' });
    }
}));
// Create a new FAQ
router.post('/faqs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('faqs');
        const faqData = req.body; // Type cast request body to FaqModel
        const result = yield collection.insertOne(faqData);
        res.status(201).json({ insertedId: result.insertedId });
    }
    catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Failed to create FAQ' });
    }
}));
// Update an FAQ
router.put('/faqs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('faqs');
        const result = yield collection.updateOne({ faqId: parseInt(req.params.id) }, { $set: req.body });
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'FAQ not found' });
        }
        else {
            res.json({ message: 'FAQ updated successfully' });
        }
    }
    catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: 'Failed to update FAQ' });
    }
}));
// Delete an FAQ
router.delete('/faqs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('faqs');
        const result = yield collection.deleteOne({ faqId: parseInt(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'FAQ not found' });
        }
        else {
            res.json({ message: 'FAQ deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ error: 'Failed to delete FAQ' });
    }
}));
// Support Ticket Routes
// Get all support tickets
router.get('/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('tickets');
        const tickets = yield collection.find({}).toArray();
        res.json(tickets);
    }
    catch (error) {
        console.error('Error fetching support tickets:', error);
        res.status(500).json({ error: 'Failed to fetch support tickets' });
    }
}));
// Get a single support ticket by ID
router.get('/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('tickets');
        const ticket = yield collection.findOne({ ticketId: parseInt(req.params.id) });
        if (ticket) {
            res.json(ticket);
        }
        else {
            res.status(404).json({ error: 'Support ticket not found' });
        }
    }
    catch (error) {
        console.error('Error fetching support ticket:', error);
        res.status(500).json({ error: 'Failed to fetch support ticket' });
    }
}));
// Create a new support ticket
router.post('/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('tickets');
        const ticketData = req.body; // Type cast request body to SupportTicketModel
        const result = yield collection.insertOne(ticketData);
        res.status(201).json({ insertedId: result.insertedId });
    }
    catch (error) {
        console.error('Error creating support ticket:', error);
        res.status(500).json({ error: 'Failed to create support ticket' });
    }
}));
// Update a support ticket
router.put('/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('tickets');
        const result = yield collection.updateOne({ ticketId: parseInt(req.params.id) }, { $set: req.body });
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Support ticket not found' });
        }
        else {
            res.json({ message: 'Support ticket updated successfully' });
        }
    }
    catch (error) {
        console.error('Error updating support ticket:', error);
        res.status(500).json({ error: 'Failed to update support ticket' });
    }
}));
// Delete a support ticket
router.delete('/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToDatabase();
        const database = client.db('your_database_name');
        const collection = database.collection('tickets');
        const result = yield collection.deleteOne({ ticketId: parseInt(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Support ticket not found' });
        }
        else {
            res.json({ message: 'Support ticket deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting support ticket:', error);
        res.status(500).json({ error: 'Failed to delete support ticket' });
    }
}));
