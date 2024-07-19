import express from 'express';
import bodyParser from 'body-parser';
const cors =require('cors');
import pool from './db';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/data', async (req, res) => {
  const { input } = req.body;
  try {
    const result = await pool.query('INSERT INTO data_store (input) VALUES ($1) RETURNING *', [input]);
    res.status(200).json({ message: 'Data saved successfully', input: result.rows[0] });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data_store');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
