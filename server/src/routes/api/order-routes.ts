import express from 'express';
import type { Request, Response } from 'express';
import { Order } from '../../models/order';

const router = express.Router(); 

//GET/ Order - get all orders

router.get('/', async (_req: Request, res: Response) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//GET /orders/:id - get order by id 

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
         res.status(200).json(order);   
        } else {
            res.status(404).json({error: 'Order not found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//POST /orders - create new order
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const newOrder = await Order.create(req.body);
        res.status(200).json(newOrder); 
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//PUT /orders/:id - update order by ID 
router.put('/:id', async )