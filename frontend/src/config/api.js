// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  API_URL: (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api'
};

// Debug logging
console.log('🔧 API Configuration Debug:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('BASE_URL:', API_CONFIG.BASE_URL);
console.log('API_URL:', API_CONFIG.API_URL);

export default API_CONFIG;