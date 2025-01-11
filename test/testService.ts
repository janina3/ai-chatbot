import axios from 'axios';
import express, { Express, Request, Response } from 'express';
import { describe, it, expect, vi } from 'vitest';

// Mock the database connection 
vi.mock('../config/dbconfig', () => ({
  connectToDatabase: vi.fn().mockResolvedValue({
    db: vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue({
        find: vi.fn().mockResolvedValueOnce([{ id: 1, message: 'Test message 1' }, { id: 2, message: 'Test message 2' }]), 
        toArray: vi.fn().mockResolvedValue([{ id: 1, message: 'Test message 1' }, { id: 2, message: 'Test message 2' }]) 
      })
    })
  })
}));

// Import your router (replace with the actual import path)
import chatLogRouter from './chatLogRouter'; 

const app: Express = express();
app.use(express.json());
app.use('/api', chatLogRouter); 

describe('Chat Log Routes', () => {
  it('should get all chat logs', async () => {
    const response = await axios.get('http://localhost:3000/api/chatlogs'); 
    expect(response.status).toBe(200);
    expect(response.data).toEqual([{ id: 1, message: 'Test message 1' }, { id: 2, message: 'Test message 2' }]);
  });
});