import { Sequelize } from 'sequelize';  // Correct import for Sequelize
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialectOptions: {
        ssl: {
          require: true,  // This ensures SSL is used
          rejectUnauthorized: false,  // This allows self-signed certificates
        },
      },
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true,  // This ensures SSL is used
          rejectUnauthorized: false,  // This allows self-signed certificates
        },
      },
    });

export default sequelize;
