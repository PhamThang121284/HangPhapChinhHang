import mongoose from 'mongoose';
import { config } from '../config/index.js';

export const connectDatabase = async () => {
  await mongoose.connect(config.mongoUri);
};

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error', err);
});
