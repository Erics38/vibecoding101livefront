const API_BASE_URL = 'http://localhost:3002/api';

export interface TSAItem {
  id: string;
  name: string;
  aliases: string[];
  carryOn: 'allowed' | 'prohibited' | 'restricted';
  checkedBag: 'allowed' | 'prohibited' | 'restricted';
  description: string;
  rules?: string;
  category: string;
}

export interface SearchResponse {
  database_results: TSAItem[];
  ai_recommendations?: any;
  query: string;
}

class APIService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request('/health');
  }

  // Search items
  async searchItems(query: string): Promise<TSAItem[]> {
    if (!query.trim()) return [];
    return this.request(`/search?q=${encodeURIComponent(query)}`);
  }

  // Get all items
  async getAllItems(category?: string, limit?: number): Promise<TSAItem[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    return this.request(`/items${queryString ? `?${queryString}` : ''}`);
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    return this.request('/categories');
  }

  // Get item by ID
  async getItemById(id: string): Promise<TSAItem> {
    return this.request(`/items/${id}`);
  }

  // Get items by category
  async getItemsByCategory(category: string): Promise<{
    category: string;
    items: TSAItem[];
    count: number;
  }> {
    return this.request(`/categories/${category}`);
  }

  // AI-powered search (when implemented)
  async aiSearch(query: string, context?: string): Promise<SearchResponse> {
    return this.request('/ai-search', {
      method: 'POST',
      body: JSON.stringify({ query, context }),
    });
  }
}

export const apiService = new APIService(); 