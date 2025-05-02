import express, { Request, Response } from 'express';
import { Cat } from '@/types/Cat';

const app = express();

app.use(express.json());

const database: Cat[] = [];

const ROOT_PATH = '/api/cat';

// Get all cats
app.get(`${ROOT_PATH}/get-cats`, (req: Request, res: Response) => {
  try {
    res.status(200).json(database);
  } catch (error) {
    res.status(500).send('Error getting cats');
  }
});

// Add a new cat
app.post(`${ROOT_PATH}/add-cat`, (req: Request, res: Response) => {
  try {
    const cat = req.body as Cat;
    database.push(cat);
    res.status(201).send(`Data added successfully: ${JSON.stringify(cat)}`);
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).send('Error adding cat');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
