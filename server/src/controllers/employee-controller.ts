import { Request, Response } from 'express';
import { Employee } from '../models/index.js';

// Get all employees
export const getEmployees = async (_req: Request, res: Response) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
};

// Get a specific employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            res.status(404).json({ message: 'No employee found with this ID.' });
            return;
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to create employee.', error });
    }
};

// Update an existing employee by ID
export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const [updatedRows] = await Employee.update(req.body, {
            where: { id: req.params.id },
        });
        if (updatedRows === 0) {
            res.status(404).json({ message: 'No employee found with this ID to update.' });
            return;
        }
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update employee.', error });
    }
};

// Delete an employee by ID
export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deletedRows = await Employee.destroy({
            where: { id: req.params.id },
        });
        if (deletedRows === 0) {
            res.status(404).json({ message: 'No employee found with this ID to delete.' });
            return;
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
};