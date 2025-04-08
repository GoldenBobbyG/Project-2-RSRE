import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import {User} from './user'  // Need a User for Client and Customer


interface PartAttributes {
    id: number;
    part_number: string;
    price: number;
    description: string;
    quantity: number;
    title: string;
}

interface PartCreationAttributes extends Optional<PartAttributes, 'id'> {}

export class Part extends Model<PartAttributes, PartCreationAttributes> implements PartAttributes {
    public id!: number;
    public part_number!: string;
    public price!: number;
    public description!: string;
    public quantity!: number;
    public title!: string;

    public readonly assignedUser?: User;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export function PartFactory(sequelize:Sequelize): typeof Part{
  Part.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        part_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //assingUser needed here maybe
        // type: DataTypes.STRING,
        // allowNull: false,
    },
    {
        tableName: 'parts',
        sequelize,
        
    }

  ); 
    return Part; 
}
    
