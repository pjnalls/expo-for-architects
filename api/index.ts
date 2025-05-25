/****************************************
 * IMPORTANT NOTE ABOUT APIs:
 * This collection of APIs that you
 * should not be deployed, as they are
 * for local development only.
 *****************************************/
import express, { Request, Response } from 'express';
import { spawn } from 'child_process';
import { Cat } from '@/types/Cat';

const app = express();

app.use(express.json());

const database: Cat[] = [];

const ROOT_PATH = '/api/cat';
const NLP_PATH = '/api/nlp';

/****************************************
 * CATS APIs
 *****************************************/
// Get all cats
app.get(`${ROOT_PATH}/get-cats`, (_, res: Response) => {
  try {
    res
      .status(200)
      .json({ message: 'Cats fetched successfully', data: database });
    console.log('[GET] Cats fetched successfully');
  } catch (error) {
    res.status(500).send('Error getting cats');
  }
});

// Add a new cat
app.post(`${ROOT_PATH}/add-cat`, (req: Request, res: Response) => {
  try {
    const cat = req.body as unknown as Cat;
    database.push(cat);
    res.status(201).json({ message: 'Cat added successfully', data: cat });
    console.log('[POST] Cat added successfully');
  } catch (error) {
    res.status(500).send('Error adding cat');
  }
});

/****************************************
 * NLP APIs
 *****************************************/
app.post(`${NLP_PATH}/classify`, (req: Request, res: Response) => {
  try {
    const { firstName } = req.body as unknown as Cat;
    const pythonProcess = spawn('python', [
      'nlp/nlp.py',
      '-m',
      firstName,
    ]);
    let result = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('[POST] NLP analysis completed');
        res.send({ message: 'NLP analysis completed', data: result });
      } else {
        res.status(500).send('Error analyzing text');
      }
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  } catch (error) {
    res.status(500).send('Error analyzing text');
  }
});

/****************************************
 * Start the server
 *****************************************/
app.listen(3000, () => {
  console.log('Server is running on port 3000\n');
});
