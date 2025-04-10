import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', getUserById);

// POST /users - Create a new user
// Add validation for required fields (e.g., name, email, etc.) in the controller or as middleware
router.post('/', createUser);

// PUT /users/:id - Update user by ID
// Make sure to validate that the user exists before updating
router.put('/:id', updateUser);

// DELETE /users/:id - Delete user by ID
// Make sure to validate that the user exists before deletion
router.delete('/:id', deleteUser);

export { router as userRoute };
