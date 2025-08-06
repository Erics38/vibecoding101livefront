const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// TSA Items Database (simplified for testing)
const tsaItems = [
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    aliases: ['water', 'bottle', 'drink bottle'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Empty water bottles are allowed through security. Filled bottles must comply with 3-1-1 rule.',
    rules: 'Empty bottles allowed. If filled, must be 3.4 oz (100ml) or less and fit in quart-sized bag.',
    category: 'Liquids'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    aliases: ['computer', 'notebook', 'macbook'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Laptops are allowed in both carry-on and checked bags.',
    rules: 'Must be removed from bag during screening. Lithium batteries should not be in checked bags if removable.',
    category: 'Electronics'
  },
  {
    id: 'scissors',
    name: 'Scissors',
    aliases: ['cutting tool'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Scissors have blade length restrictions for carry-on.',
    rules: 'Blades must be shorter than 4 inches from pivot point to be allowed in carry-on.',
    category: 'Sharp Objects'
  }
];

// Helper functions
const searchItems = (query) => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return tsaItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.aliases.some(alias => alias.toLowerCase().includes(lowercaseQuery)) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 20);
};

const getItemsByCategory = (category) => {
  if (category === 'all') return tsaItems.slice(0, 50);
  return tsaItems.filter(item => item.category === category).slice(0, 10);
};

const getAllCategories = () => {
  const categories = [...new Set(tsaItems.map(item => item.category))];
  return categories.sort();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TSA Search API is running' });
});

// Get all items
app.get('/api/items', (req, res) => {
  const { category, limit = 50 } = req.query;
  
  if (category && category !== 'all') {
    const items = tsaItems.filter(item => item.category === category).slice(0, parseInt(limit));
    res.json(items);
  } else {
    res.json(tsaItems.slice(0, parseInt(limit)));
  }
});

// Search items
app.get('/api/search', (req, res) => {
  const { q: query } = req.query;
  
  if (!query) {
    return res.json([]);
  }
  
  const results = searchItems(query);
  res.json(results);
});

// Get categories
app.get('/api/categories', (req, res) => {
  res.json(getAllCategories());
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = tsaItems.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// Get items by category
app.get('/api/categories/:category', (req, res) => {
  const { category } = req.params;
  const items = getItemsByCategory(category);
  
  res.json({
    category: category,
    items: items,
    count: items.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TSA Search Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/search?q=water`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
}); 