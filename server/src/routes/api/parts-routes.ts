import express from 'express';
import { 
  getAllParts, 
  getPartByTitle, 
  updateScheduledMaintenanceWithPart, 
  removePart 
} from '../../controllers/part-controller.js';

const router = express.Router();

// Route to get all parts
router.get('/', getAllParts);

// Route to get a specific part by title
router.get('/:title', getPartByTitle);

// Route to update a scheduled maintenance with part
router.post('/:title/:partId', updateScheduledMaintenanceWithPart);

// Route to remove a part from scheduled maintenance
router.delete('/', removePart);

export { router as partRoute };
