import express from 'express';

const app = express();
app.use(express.json()); // Parse incoming JSON requests

const port = 3000; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});