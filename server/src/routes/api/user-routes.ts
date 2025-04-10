import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../../controllers/user-controller';

const router = express.Router();

// Get All Users
router.get('/', getAllUsers);

// Get User By ID
router.get('/:id', getUserById);

// Create User
router.post('/', createUser);

// Update User
router.put('/:id', updateUser);

// Delete User
router.delete('/:id', deleteUser);

export { router as userRoute };