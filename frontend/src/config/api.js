// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  API_URL: (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api'
};

export default API_CONFIG;