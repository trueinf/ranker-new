import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { createServer } from 'vite';

const app = express();
app.use(cors());

const SERP_API_KEY = '8d18898cc86216aaa53123adece9193fa5f054e8ec741f54ee88eaa58eda2141';

app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&api_key=${SERP_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

// Create Vite server
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
});

// Use vite's connect instance as middleware
app.use(vite.middlewares);

const port = 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});