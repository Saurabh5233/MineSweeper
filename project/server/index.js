import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PythonShell } from 'python-shell';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(join(__dirname, '../dist')));

let pythonProcess = null;

// Start Python backend
function startPythonBackend() {
  const options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'],
    scriptPath: join(__dirname, '../backend'),
  };

  pythonProcess = new PythonShell('server.py', options);

  pythonProcess.on('error', (err) => {
    console.error('Failed to start Python process:', err);
  });
}

// Start Python backend when Node.js server starts
startPythonBackend();

// Proxy routes to Python backend
app.post('/new-game', async (req, res) => {
  try {
    const response = await fetch('http://localhost:5000/new-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start new game' });
  }
});

app.post('/reveal', async (req, res) => {
  try {
    const response = await fetch('http://localhost:5000/reveal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reveal cell' });
  }
});

app.post('/flag', async (req, res) => {
  try {
    const response = await fetch('http://localhost:5000/flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle flag' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Cleanup when server shuts down
process.on('SIGTERM', () => {
  if (pythonProcess) {
    pythonProcess.end();
  }
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});