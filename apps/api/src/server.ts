import { app } from './app.js';
import { config } from './config/index.js';
import { connectDatabase } from './utils/db.js';

const start = async () => {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`API running on ${config.port}`);
  });
};

start();
