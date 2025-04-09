import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface OrderAttributes {
    id: number;
    service_name: string;
    price: number;
    service_date: number;
    user_id: number;
    employee_id: number;
    
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

    export class Order 
    extends Model<OrderAttributes, OrderCreationAttributes>
    implements OrderAttributes

    {
        public id! : number;
        public service_name! : string;
        public price! : number;
        public service_date! : number;
        public user_id! : number;
        public employee_id! : number;

        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

    }

    export function OrderFactory(sequelize: Sequelize): typeof Order {
        Order.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                service_name: 
                {
                    type: DataTypes.STRING, 
                    allowNull: false,

                },
                price: {
                    type: DataTypes.DECIMAL, 
                    allowNull: false,
                    
                },
                service_date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                employee_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false, 
                },
            },
            {
                tableName: 'orders',
                sequelize,
            }
        );
        
    return Order;
    }


