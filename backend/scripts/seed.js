import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Book from '../models/bookModel.js';

const demoPath = path.join(process.cwd(), 'data', 'demoBooks.json');

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_LOCAL_URI || 'mongodb://127.0.0.1:27017/bookseller';
  if (!uri) {
    console.error('No MongoDB URI. Set MONGODB_URI or MONGO_LOCAL_URI');
    process.exit(1);
  }
  console.log('Connecting to', uri);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('Connected. Loading demo books from', demoPath);

  const raw = fs.readFileSync(demoPath, 'utf-8');
  const items = JSON.parse(raw);
  const docs = items.map(b => ({
    title: b.title,
    author: b.author,
    price: Number(b.price) || 0,
    rating: Number(b.rating) || 4,
    category: b.category || 'General',
    description: b.description || '',
    image: b.image || null,
  }));

  await Book.deleteMany({});
  await Book.insertMany(docs);
  console.log(`Seeded ${docs.length} books.`);
  await mongoose.disconnect();
  console.log('Done.');
}

run().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
