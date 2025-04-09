import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EmployeeFactory } from './employee.js';
import { PartFactory } from './part.js';
import { OrderFactory } from './order.js';
import { OrderPartFactory } from './orderPart.js';

// Initialize the models
const User = UserFactory(sequelize);
const Employee = EmployeeFactory(sequelize);
const Part = PartFactory(sequelize);
const Order = OrderFactory(sequelize);
const OrderPart = OrderPartFactory(sequelize);

// Create associations between the models
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Order.belongsTo(User, {
  foreignKey: 'user_id',
});

Employee.hasMany(Order, {
  foreignKey: 'assigned_employee_id',
  onDelete: 'SET NULL',
});

Order.belongsTo(Employee, {
  foreignKey: 'assigned_employee_id',
});

// Many-to-many relationship between Order and Part through OrderPart
Order.belongsToMany(Part, { 
  through: OrderPart,
  foreignKey: 'order_id',
});

Part.belongsToMany(Order, { 
  through: OrderPart,
  foreignKey: 'part_id',
});

// Direct associations to the junction table
Order.hasMany(OrderPart, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
});

OrderPart.belongsTo(Order, {
  foreignKey: 'order_id',
});

Part.hasMany(OrderPart, {
  foreignKey: 'part_id',
  onDelete: 'CASCADE',
});

OrderPart.belongsTo(Part, {
  foreignKey: 'part_id',
});

export { User, Employee, Part, Order, OrderPart };