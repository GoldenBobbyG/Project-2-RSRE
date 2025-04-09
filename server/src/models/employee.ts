import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// This Feedback model is responsible for managing the database interaction
interface EmployeeAttributes {
    id: number;
    technician: string;
    title: string;
    username: string;
    passwords: string;
}

// Optional is a TypeScript utility type that makes some properties optional.
// FeedbackCreationAttributes extends Optional to make the 'id' field optional when creating a new Feedback entry.
interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> { }

// The Feedback class extends Sequelize's Model class and implements FeedbackAttributes to enforce the structure of feedback records.
export class Employees extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
    public id!: number;
    public technician!: string;
    public title!: string;
    public username!: string;
    public passwords!: string;
}

// The FeedbackFactory function initializes the Feedback model with its attributes and configurations.
// This function will be used in the Express.js application to set up the Feedback table in the PostgreSQL database.
export function EmployeeFactory(sequelize: Sequelize): typeof Employees {
    Employees.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,  // Automatically incrementing ID for each feedback entry.
                primaryKey: true,     // Primary key for the Feedback table.
            },
            technician: {
                type: DataTypes.STRING,
                allowNull: false,     // Email field cannot be null.
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,      // Feedback type can be null, defaults to 'user feedback'.
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true,     // Feedback content cannot be null.
            },
            passwords: {
                type: DataTypes.STRING,
                allowNull: true,     // Feedback content cannot be null.
            },
        },
        {
            tableName: 'employees',  // Name of the table in PostgreSQL.
            sequelize,               // The Sequelize instance that connects to PostgreSQL.
        }
    );

    return Employees;  // Returns the initialized model to be used in the application.
}