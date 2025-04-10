import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Dynamic CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.RENDER_EXTERNAL_HOSTNAME // Automatically provided by Render
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Serve static files from React build
app.use(express.static(
  path.join(__dirname, '../../my-car-repair-shop/dist')
));

// API routes
app.use('/api', routes);

// Client-side routing
app.get('*', (_req, res) => {
  res.sendFile(
    path.join(__dirname, '../../my-car-repair-shop/dist/index.html')
  );
});

// Database and server start
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS origin: ${corsOptions.origin}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});