// API Configuration - FORCE PRODUCTION URL
const PRODUCTION_API = 'https://bookseller-main.onrender.com';

const API_CONFIG = {
  BASE_URL: PRODUCTION_API,
  API_URL: PRODUCTION_API + '/api'
};

// Force debug logging
console.log('=== FORCED PRODUCTION API CONFIG ===');
console.log('BASE_URL:', API_CONFIG.BASE_URL);
console.log('API_URL:', API_CONFIG.API_URL);
console.log('===================================');

export default API_CONFIG;