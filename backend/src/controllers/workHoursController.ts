import { Request, Response } from 'express';
import { WorkedHoursService } from '../services/WorkedHoursService';

const workedHoursService = new WorkedHoursService();

export const upsertWorkHours = async (req: Request, res: Response) => {
    const { collaboratorId } = req.params;
    const { date, hoursWorked } = req.body;

    try {
        const workedHours = await workedHoursService.createOrUpdateWorkHours(collaboratorId, date, hoursWorked);
        return res.status(200).json(workedHours);
    } catch (error: unknown) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getWorkHoursByEmployee = async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    try {
        const workedHours = await workedHoursService.getWorkHoursByCollaborator(employeeId);

        return res.status(200).json(workedHours);
    } catch (error: unknown) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
