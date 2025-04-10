import { Router } from 'express';
import { 
    getEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} from '../../controllers/employee-controller'; // Corrected the import path

const router = Router();

// Route to get all employees
router.get('/', getEmployees);

// Route to get a specific employee by ID
router.get('/:id', getEmployeeById);

// Route to create a new employee
router.post('/', createEmployee);

// Route to update an existing employee by ID
router.put('/:id', updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', deleteEmployee);

export default router;