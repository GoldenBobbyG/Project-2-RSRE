// import { Request, Response } from 'express';
// import { OrderService } from '../services/order-service';

// export class OrdersController {
//     private orderService: OrderService;

//     constructor() {
//         this.orderService = new OrderService();
//     }

//     // Get all orders
//     async getAllOrders(req: Request, res: Response): Promise<void> {
//         try {
//             const orders = await this.orderService.getAllOrders();
//             res.status(200).json(orders);
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to fetch orders', error });
//         }
//     }

//     // Get order by ID
//     async getOrderById(req: Request, res: Response): Promise<void> {
//         try {
//             const { id } = req.params;
//             const order = await this.orderService.getOrderById(id);
//             if (!order) {
//                 res.status(404).json({ message: 'Order not found' });
//                 return;
//             }
//             res.status(200).json(order);
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to fetch order', error });
//         }
//     }

//     // Create a new order
//     async createOrder(req: Request, res: Response): Promise<void> {
//         try {
//             const orderData = req.body;
//             const newOrder = await this.orderService.createOrder(orderData);
//             res.status(201).json(newOrder);
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to create order', error });
//         }
//     }

//     // Update an order
//     async updateOrder(req: Request, res: Response): Promise<void> {
//         try {
//             const { id } = req.params;
//             const orderData = req.body;
//             const updatedOrder = await this.orderService.updateOrder(id, orderData);
//             if (!updatedOrder) {
//                 res.status(404).json({ message: 'Order not found' });
//                 return;
//             }
//             res.status(200).json(updatedOrder);
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to update order', error });
//         }
//     }

//     // Delete an order
//     async deleteOrder(req: Request, res: Response): Promise<void> {
//         try {
//             const { id } = req.params;
//             const deleted = await this.orderService.deleteOrder(id);
//             if (!deleted) {
//                 res.status(404).json({ message: 'Order not found' });
//                 return;
//             }
//             res.status(200).json({ message: 'Order deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to delete order', error });
//         }
//     }
// }

// export const ordersController = new OrdersController();