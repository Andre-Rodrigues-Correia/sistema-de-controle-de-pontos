import { Request, Response } from 'express';
import { WorkedHoursService} from "../../src/services/WorkedHoursService";
import { WorkedHoursController} from "../../src/controllers/workHoursController";

jest.mock('../../src/services/WorkedHoursService');

describe('WorkedHoursController', () => {
    let workedHoursService: jest.Mocked<WorkedHoursService>;
    let controller: WorkedHoursController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        workedHoursService = new WorkedHoursService() as jest.Mocked<WorkedHoursService>;
        controller = new WorkedHoursController(workedHoursService);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    describe('createWorkHours', () => {
        it('should create work hours and return 201 status', async () => {
            const mockWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [] };
            workedHoursService.createWorkHours.mockResolvedValue(mockWorkHours as any);

            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', hoursWorked: '8' };

            await controller.createWorkHours(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockWorkHours);
            expect(workedHoursService.createWorkHours).toHaveBeenCalledWith('1', '2023-01-01');
        });

        it('should return 500 status on error', async () => {
            workedHoursService.createWorkHours.mockRejectedValue(new Error('Internal server error'));

            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01'};

            await controller.createWorkHours(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });

    describe('updateInOrOut', () => {
        it('should update inOrOut and return 200 status', async () => {
            const mockUpdatedWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: ['08:00:00'] };
            workedHoursService.updateInOrOut.mockResolvedValue(mockUpdatedWorkHours as any);

            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', inOrOut: ['08:00:00'] };

            await controller.updateInOrOut(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedWorkHours);
            expect(workedHoursService.updateInOrOut).toHaveBeenCalledWith('1', { date: '2023-01-01', inOrOut: ['08:00:00'] });
        });

        it('should return 500 status on error', async () => {
            workedHoursService.updateInOrOut.mockRejectedValue(new Error('Internal server error'));

            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };

            await controller.updateInOrOut(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });

    describe('getWorkHoursByEmployee', () => {
        it('should return work hours and 200 status', async () => {
            const mockWorkHours = [
                { collaboratorId: '1', date: '2023-01-01', inOrOut: [] },
                { collaboratorId: '1', date: '2023-01-02', inOrOut: [] },
            ];
            workedHoursService.getWorkHoursByCollaborator.mockResolvedValue(mockWorkHours as any);

            req.params = { collaboratorId: '1' };

            await controller.getWorkHoursByEmployee(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockWorkHours);
            expect(workedHoursService.getWorkHoursByCollaborator).toHaveBeenCalledWith('1');
        });

        it('should return 500 status on error', async () => {
            workedHoursService.getWorkHoursByCollaborator.mockRejectedValue(new Error('Internal server error'));

            req.params = { collaboratorId: '1' };

            await controller.getWorkHoursByEmployee(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
});
