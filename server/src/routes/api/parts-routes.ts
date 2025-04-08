import express from 'express';
import { getAllParts, 
getPartByTitle, 
updateScheduledMaintenanceWithPart, 
removePart, 
 } from '../../controllers/part-controller';

const router = express.Router();

// Route to get all parts
router.get('/', getAllParts);

// Route to get a specific part by ID
router.get('/:id', getPartByTitle);

// Update scheduled maintence with part
router.post('/', updateScheduledMaintenanceWithPart);

// Route to delete a part
router.delete('/:id', removePart);

export {router as partRoute };