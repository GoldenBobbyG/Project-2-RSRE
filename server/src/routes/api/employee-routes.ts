import express from 'express';
import type { Request, Response } from 'express';
import { Employees } from '../../models/employee.js';
const router = express.Router();
// GET all employees
router.get('/', async (_req: Request, res: Response) => {
  try {
    const employees = await Employees.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// GET employee by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const employee = await Employees.findByPk(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// POST create new employee
router.post('/', async (req: Request, res: Response) => {
  try {
    const newEmployee = await Employees.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export { router as employeeRoute };