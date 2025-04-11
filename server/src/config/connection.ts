import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from a .env file into process.env

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',       // Database host
      dialect: 'postgres',     // Database dialect (PostgreSQL)
      dialectOptions: {
        decimalNumbers: true,  // Ensure decimal numbers are handled correctly
      },
    });

export default sequelize;
