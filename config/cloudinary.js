const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

// Load env from the root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Debug logs
console.log('Cloudinary Environment Variables:');
console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'MISSING');
console.log('API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING');

const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Configure cloudinary
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(config);

// Verify configuration
console.log('Cloudinary Configuration:', {
  ...config,
  api_secret: config.api_secret ? '***' : undefined
});

module.exports = cloudinary;