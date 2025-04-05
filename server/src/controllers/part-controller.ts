import {Request, Response} from 'express';
import {Part} from '../models/Part.js';
import {User} from '../models/User.js'; // need to added user 


    // Get all parts
export const  PartController = async (_req: Request, res: Response) => {
        try {
            const parts = await Part.findall({
                include: [
                    {
                        model: Part,
                        as: 'title',
                        attributes: ['id', 'part_number', 'price', 'description', 'quantity'],
                    }
                ],
        });
            res.status(200).json(parts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch parts' });
        }
    }

    // Get part by Title
    export const getPartByTitle = async (req: Request, res: Response) => {
        try {
            const { title } = req.params;
            const part = await Part.findOne({
                where: { title },
                attributes: ['id', 'part_number', 'price', 'description', 'quantity'],
            });
            if (!part) {
                res.status(404).json({ error: 'Part not found' });
                return;
            }
            res.status(200).json(part);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch part' });
        }
    };

   

    // Update a scheduled maintenance with a part
    export const updateScheduledMaintenanceWithPart = async (req: Request, res: Response) => { 
        
            const { maintenanceId, partId } = req.body;
            const maintenance = await Part.findByTitle(maintenanceId);
        try {
           
            if (!maintenance) {
                res.status(404).json({ error: 'Scheduled maintenance not found' });
                return;
            }
            const part = await Part.findById(partId);
            if (!part) {
                res.status(404).json({ error: 'Part not found' });
                return;
            }
            maintenance.parts = maintenance.parts.map((p) =>
                p._id.toString() === partId ? part : p
            );
            await maintenance.save();
            res.status(200).json(maintenance);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update scheduled maintenance' });
        }
    }

    // Delete a part from scheduled maintenance
    export const removePart = async (req: Request, res: Response) => {
        const { title,} = req.body;
        try {
            const part = await Part.findOne({ where: { title } });
            if (!part) {
                await part.destroy();
                res.json({ message: 'part deleted successfully' });
            }else {
                res.status(404).json({ error: 'Part not found' });
            res.status(200).json(maintenance);
            }        ;
        } catch (error: any) {
            res.status(500).json({ error: 'Failed to delete part' });
        }
    }
