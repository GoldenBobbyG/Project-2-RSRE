// models/orderPart.ts
import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { Order } from './order';
import { Part } from './part';

interface OrderPartAttributes {
  id: number;
  order_id: number;
  part_id: number;
  quantity?: number;
}

interface OrderPartCreationAttributes extends Optional<OrderPartAttributes, 'id'> {}

export class OrderPart extends Model<OrderPartAttributes, OrderPartCreationAttributes> implements OrderPartAttributes {
  public id!: number;
  public order_id!: number;
  public part_id!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function OrderPartFactory(sequelize: Sequelize): typeof OrderPart {
  OrderPart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Order,
          key: 'id',
        },
      },
      part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Part,
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      tableName: 'order_parts',
      sequelize,
    }
  );

  return OrderPart;
}