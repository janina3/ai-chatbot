import express from 'express';
import { generateResponse } from './src/chatbot';

const app = express();
const port = 3000; // Define the port for your server

app.use(express.json()); // Parse incoming requests as JSON

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body; 
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await generateResponse(message); 
    res.json({ response }); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});