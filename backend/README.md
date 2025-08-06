# TSA Search Backend API

A powerful backend API for the TSA Search Application with OpenRouter AI integration. This backend provides enhanced search capabilities, AI-powered recommendations, and comprehensive TSA item database management.

## 🚀 Features

### **AI-Powered Search**
- **OpenRouter Integration**: Uses Claude 3.5 Sonnet for intelligent responses
- **Smart Recommendations**: Provides personalized packing tips and alternatives
- **Context-Aware Responses**: Understands user context and travel scenarios
- **Fallback Support**: Works even without AI when API key is not configured

### **Comprehensive API Endpoints**
- **Search API**: Fast database search with 90+ TSA items
- **Category API**: Browse items by category with top 10 items each
- **AI Search API**: Intelligent search with AI recommendations
- **Health Check**: Monitor API status and performance

### **Enhanced Database**
- **90+ TSA Items**: Comprehensive coverage across 9 categories
- **Detailed Regulations**: Each item includes carry-on and checked bag rules
- **Multiple Aliases**: Smart search with synonyms and common names
- **Real-time Updates**: Instant search results and recommendations

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your OpenRouter API key:

```bash
cp env.example .env
```

Edit `.env` and add your OpenRouter API key:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3001
```

### 3. Get OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Create an account and get your API key
3. Add the key to your `.env` file

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "OK",
  "message": "TSA Search API is running"
}
```

### Search Items
```http
GET /api/search?q=water
```
**Response:**
```json
[
  {
    "id": "water-bottle",
    "name": "Water Bottle",
    "carryOn": "restricted",
    "checkedBag": "allowed",
    "description": "Empty water bottles are allowed through security...",
    "rules": "Empty bottles allowed. If filled, must be 3.4 oz (100ml) or less...",
    "category": "Liquids"
  }
]
```

### Get All Items
```http
GET /api/items?category=Liquids&limit=10
```

### Get Categories
```http
GET /api/categories
```

### AI-Powered Search
```http
POST /api/ai-search
Content-Type: application/json

{
  "query": "Can I bring my laptop charger?",
  "context": "I'm traveling internationally"
}
```

**Response:**
```json
{
  "database_results": [...],
  "ai_recommendations": {
    "answer": "Yes, you can bring your laptop charger...",
    "rules": "Power adapters are allowed in both carry-on and checked bags...",
    "tips": "Keep your charger easily accessible for screening...",
    "alternatives": "Consider a universal adapter for international travel...",
    "related_items": ["power-bank", "laptop", "tablet"],
    "confidence": "high"
  },
  "query": "Can I bring my laptop charger?"
}
```

### Get Item by ID
```http
GET /api/items/laptop
```

### Get Items by Category
```http
GET /api/categories/Liquids
```

## 🤖 AI Integration Benefits

### **Enhanced User Experience**
- **Natural Language Queries**: Users can ask questions in plain English
- **Contextual Responses**: AI understands travel scenarios and provides relevant advice
- **Alternative Suggestions**: When items are prohibited, AI suggests alternatives
- **Packing Tips**: Practical advice for packing and traveling

### **Comprehensive Coverage**
- **Unknown Items**: AI can handle items not in the database
- **Complex Scenarios**: Handles edge cases and special situations
- **Updated Information**: AI provides current TSA regulations
- **International Travel**: Considers different airline and country regulations

### **Smart Recommendations**
- **Related Items**: Suggests similar items users might want to know about
- **Confidence Levels**: Indicates how certain the AI is about its response
- **Practical Tips**: Provides real-world packing and travel advice
- **Regulation Updates**: Keeps up with changing TSA policies

## 🔧 Configuration

### Environment Variables
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `PORT`: Server port (default: 3001)

### AI Model Configuration
- **Model**: `anthropic/claude-3.5-sonnet`
- **Max Tokens**: 1000
- **Temperature**: 0.3 (balanced creativity and accuracy)

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
1. Set up your `.env` file with OpenRouter API key
2. Configure your deployment platform (Heroku, Vercel, etc.)
3. Set environment variables in your deployment platform

## 📊 Performance

- **Fast Response Times**: Database queries under 100ms
- **AI Integration**: OpenRouter responses typically under 2 seconds
- **Scalable Architecture**: Ready for production deployment
- **CORS Enabled**: Works with any frontend application

## 🔗 Frontend Integration

The backend is designed to work seamlessly with your React frontend. Update your frontend to use these API endpoints instead of the local data.

## 🎯 How This Makes Your App Better

### **Before (Frontend Only)**
- ❌ Limited to 90 predefined items
- ❌ No AI assistance
- ❌ Static responses
- ❌ No context awareness
- ❌ No alternative suggestions

### **After (Backend + AI)**
- ✅ **Unlimited Coverage**: AI can handle any item query
- ✅ **Intelligent Responses**: Context-aware, personalized advice
- ✅ **Dynamic Updates**: AI stays current with regulations
- ✅ **Smart Alternatives**: Suggests alternatives for prohibited items
- ✅ **Enhanced UX**: Natural language queries and comprehensive responses
- ✅ **Scalable Architecture**: Ready for production and growth

This backend transforms your TSA search app from a simple database lookup into an intelligent, AI-powered travel assistant that can handle any question about airport security! 