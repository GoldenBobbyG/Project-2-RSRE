// import express from 'express';
// import { getAllParts, 
// getPartByTitle, 
// updateScheduledMaintenanceWithPart, 
// removePart, 
//  } from '../../controllers/part-controller.js';

// const router = express.Router();

// // Route to get all parts
// router.get('/', getAllParts);

// // Route to get a specific part by ID
// router.get('/:title', getPartByTitle);

// // Update scheduled maintence with part
// router.post('/', updateScheduledMaintenanceWithPart);

// // Route to delete a part
// router.delete('/:id', removePart);

// export {router as partRoute };

import { Router } from 'express';
import type { Request, Response } from 'express';
import { Part, Order } from '../../models/index.js';

const router = Router();
// Route to get all parts
router.get('/', async (_req: Request, res: Response) => {
    try {
        // Fetch all parts associated with a order
        const partsData = await Part.findAll({
            include: [{ model: Order }, { model: Part }],
        });
        res.status(200).json(partsData);
    }   catch (error) {
        res.status(500).json(error);
    }
});
// Route to get a specific part by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const partData = await Part.findByPk(req.params.id, {
            include: [{ model: Order }, { model: Part }],
        });
        if (!partData) {
            res.status(404).json({ message: 'No part found with this id!' });
            return;
        }
        res.status(200).json(partData);
    } catch (error) {
        res.status(500).json(error);
    }
});
// Route to create a new part
router.post('/', async (req: Request, res: Response) => {
    try {
        const partData = await Part.create(req.body);
        res.status(200).json(partData);
    } catch (error) {
        res.status(400).json(error);
    }
});
// Route to delete a part
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const partData = await Part.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!partData) {
            res.status(404).json({ message: 'No part found with this id!' });
            return;
        }
        res.status(200).json(partData);
    } catch (error) {
        res.status(500).json(error);
    }
});
export default router;