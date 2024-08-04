import { Request, Response } from 'express';
import { WorkedHoursService } from '../services/WorkedHoursService';

export class WorkedHoursController {
    private workedHoursService: WorkedHoursService;

    constructor(workedHoursService: WorkedHoursService) {
        this.workedHoursService = workedHoursService;
    }

    public createWorkHours = async (req: Request, res: Response): Promise<Response> => {
        const { collaboratorId } = req.params;
        const { date } = req.body;

        try {
            const workedHours = await this.workedHoursService.createWorkHours(collaboratorId, date);
            return res.status(201).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    public updateInOrOut = async (req: Request, res: Response): Promise<Response> => {
        const { collaboratorId } = req.params;
        try {
            const updatedWorkHours = await this.workedHoursService.updateInOrOut(collaboratorId, req.body);
            return res.status(200).json(updatedWorkHours);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getWorkHoursByEmployee = async (req: Request, res: Response): Promise<Response> => {
        const { collaboratorId } = req.params;

        try {
            const workedHours = await this.workedHoursService.getWorkHoursByCollaborator(collaboratorId);
            return res.status(200).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
