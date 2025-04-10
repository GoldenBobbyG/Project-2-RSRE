import express from 'express';
import cors from 'cors';  // Import the CORS middleware
import sequelize from './config/connection.js'; // Import the initialized Sequelize instance
import routes from './routes/index.js';  // Import the routes for handling different endpoints

const app = express();  // Create an Express application
const PORT = process.env.PORT || 3001;  // Change the port to 3001 for the backend

const forceDatabaseRefresh: boolean = false;  // Set to true to force database refresh on server start

// CORS setup: Allow requests from the front-end running on a different port (React dev server)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow front-end requests from this port (adjust if different)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
  credentials: true,  // Allow credentials (e.g., cookies)
}));

// Middleware to serve static files (if you were serving a production build of React, adjust path accordingly)
app.use(express.static('../client/dist'));  // You can remove this line if you're not serving static files

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the imported routes for handling API endpoints
app.use('/api', routes);  // Prefix routes with /api for API requests

// Sync the Sequelize models with the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {  // Start the server and listen on the defined port
    console.log(`Server is listening on port ${PORT}`);  // Log a message when the server starts
  });
});
