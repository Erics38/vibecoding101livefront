const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TSA Search API is running' });
});

// Test search route
app.get('/api/search', (req, res) => {
  const { q: query } = req.query;
  
  if (!query) {
    return res.json([]);
  }
  
  // Simple test response
  res.json([
    {
      id: 'test-item',
      name: 'Test Item',
      carryOn: 'allowed',
      checkedBag: 'allowed',
      description: 'This is a test item',
      category: 'Test'
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test TSA Search Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/search?q=test`);
}); 