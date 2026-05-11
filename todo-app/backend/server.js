require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Init table
pool.query(`CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
)`);

app.get('/tasks',          async (_, res) => res.json((await pool.query('SELECT * FROM tasks ORDER BY id')).rows));
app.post('/tasks',         async (req, res) => res.json((await pool.query('INSERT INTO tasks(title) VALUES($1) RETURNING *', [req.body.title])).rows[0]));
app.put('/tasks/:id',      async (req, res) => res.json((await pool.query('UPDATE tasks SET title=$1, done=$2 WHERE id=$3 RETURNING *', [req.body.title, req.body.done, req.params.id])).rows[0]));
app.delete('/tasks/:id',   async (req, res) => { await pool.query('DELETE FROM tasks WHERE id=$1', [req.params.id]); res.sendStatus(204); });

app.listen(process.env.PORT || 5000, () => console.log(`Server on port ${process.env.PORT || 5000}`));