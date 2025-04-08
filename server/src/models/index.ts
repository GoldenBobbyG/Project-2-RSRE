import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { PartFactory } from './part.js';

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL) 
    : new Sequelize(process.env.DB_NAME || '', 
        process.env.DB_USER || '',
        process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserFactory(sequelize);
const Part = PartFactory(sequelize);

User.hasMany(Part, {foreignKey: 'userId',});
Part.belongsTo(User, {foreignKey: 'userId',});