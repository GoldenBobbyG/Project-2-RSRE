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
        const partsData = await Part.findAll({
            include: [{ model: Order }], // Removed { model: Part } if unnecessary
        });
        res.status(200).json(partsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
});

// Route to get a specific part by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const partData = await Part.findByPk(req.params.id, {
            include: [{ model: Order }], // Removed { model: Part } if unnecessary
        });
        if (!partData) {
            res.status(404).json({ message: 'No part found with this id!' });
            return;
        }
        res.status(200).json(partData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
});

// Route to create a new part
router.post('/', async (req: Request, res: Response) => {
    try {
        // Validate req.body here
        const partData = await Part.create(req.body);
        res.status(200).json(partData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to create part.', error });
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
        res.status(200).json({ message: 'Part deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
});

export default router;