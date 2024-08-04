import { WorkedHoursService} from "../../src/services/WorkedHoursService";
import models from "../../src/models";
import { Model, ModelStatic } from 'sequelize';

jest.mock('../../src/models', () => ({
    WorkedHours: {
        findOne: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    },
}));

type MockedModel = jest.Mocked<ModelStatic<Model>>;

describe('WorkedHoursService', () => {
    let service: WorkedHoursService;
    const { WorkedHours } = models as unknown as { WorkedHours: MockedModel };

    beforeEach(() => {
        service = new WorkedHoursService();
        jest.clearAllMocks();
    });

    describe('createWorkHours', () => {
        it('should create work hours if none exist', async () => {
            WorkedHours.findOne.mockResolvedValue(null);
            WorkedHours.create.mockResolvedValue({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] } as any);

            const result = await service.createWorkHours('1', '2023-01-01');

            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(WorkedHours.create).toHaveBeenCalledWith({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] });
            expect(result).toEqual({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] });
        });

        it('should return existing work hours if found', async () => {
            const existingWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [] };
            WorkedHours.findOne.mockResolvedValue(existingWorkHours as any);

            const result = await service.createWorkHours('1', '2023-01-01');

            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(result).toEqual(existingWorkHours);
            expect(WorkedHours.create).not.toHaveBeenCalled();
        });
    });

    describe('updateInOrOut', () => {
        it('should update inOrOut if work hours entry exists', async () => {
            const existingWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [], save: jest.fn() };
            WorkedHours.findOne.mockResolvedValue(existingWorkHours as any);

            const collaborator = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };

            const result = await service.updateInOrOut('1', collaborator);

            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(existingWorkHours.inOrOut).toEqual(['08:00:00', '12:00:00']);
            expect(existingWorkHours.save).toHaveBeenCalled();
            expect(result).toEqual(existingWorkHours);
        });

        it('should throw an error if work hours entry does not exist', async () => {
            WorkedHours.findOne.mockResolvedValue(null);

            const collaborator = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };

            await expect(service.updateInOrOut('1', collaborator)).rejects.toThrow('Work hours entry not found');
            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
        });
    });

    describe('getWorkHoursByCollaborator', () => {
        it('should return all work hours for a given collaborator', async () => {
            const workHours = [
                { collaboratorId: '1', date: '2023-01-01', inOrOut: [] },
                { collaboratorId: '1', date: '2023-01-02', inOrOut: [] },
            ];
            WorkedHours.findAll.mockResolvedValue(workHours as any);

            const result = await service.getWorkHoursByCollaborator('1');

            expect(WorkedHours.findAll).toHaveBeenCalledWith({ where: { collaboratorId: '1' } });
            expect(result).toEqual(workHours);
        });
    });
});
