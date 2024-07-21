import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const cors =require ('cors');
import pool from './db';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

interface Data {
  id: number;
  input_data: string;
}

app.post('/api/data', async (req: Request, res: Response) => {
  const { input } = req.body;
  try {
    const result = await pool.query<Data>(
      'INSERT INTO test (input_data) VALUES ($1) RETURNING *',
      [input]
    );
    res.status(200).json({ message: 'Data saved successfully', input: result.rows[0] });
  } catch (error) {
    console.error('Error saving data:', (error as Error).message, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Data>('SELECT * FROM test');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
