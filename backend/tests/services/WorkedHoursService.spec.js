"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WorkedHoursService_1 = require("../../src/services/WorkedHoursService");
const models_1 = __importDefault(require("../../src/models"));
jest.mock('../../src/models', () => ({
    WorkedHours: {
        findOne: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    },
}));
describe('WorkedHoursService', () => {
    let service;
    const { WorkedHours } = models_1.default;
    beforeEach(() => {
        service = new WorkedHoursService_1.WorkedHoursService();
        jest.clearAllMocks();
    });
    describe('createWorkHours', () => {
        it('should create work hours if none exist', () => __awaiter(void 0, void 0, void 0, function* () {
            WorkedHours.findOne.mockResolvedValue(null);
            WorkedHours.create.mockResolvedValue({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] });
            const result = yield service.createWorkHours('1', '2023-01-01');
            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(WorkedHours.create).toHaveBeenCalledWith({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] });
            expect(result).toEqual({ collaboratorId: '1', date: '2023-01-01', inOrOut: [] });
        }));
        it('should return existing work hours if found', () => __awaiter(void 0, void 0, void 0, function* () {
            const existingWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [] };
            WorkedHours.findOne.mockResolvedValue(existingWorkHours);
            const result = yield service.createWorkHours('1', '2023-01-01');
            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(result).toEqual(existingWorkHours);
            expect(WorkedHours.create).not.toHaveBeenCalled();
        }));
    });
    describe('updateInOrOut', () => {
        it('should update inOrOut if work hours entry exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const existingWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [], save: jest.fn() };
            WorkedHours.findOne.mockResolvedValue(existingWorkHours);
            const collaborator = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };
            const result = yield service.updateInOrOut('1', collaborator);
            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
            expect(existingWorkHours.inOrOut).toEqual(['08:00:00', '12:00:00']);
            expect(existingWorkHours.save).toHaveBeenCalled();
            expect(result).toEqual(existingWorkHours);
        }));
        it('should throw an error if work hours entry does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            WorkedHours.findOne.mockResolvedValue(null);
            const collaborator = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };
            yield expect(service.updateInOrOut('1', collaborator)).rejects.toThrow('Work hours entry not found');
            expect(WorkedHours.findOne).toHaveBeenCalledWith({ where: { collaboratorId: '1', date: '2023-01-01' } });
        }));
    });
    describe('getWorkHoursByCollaborator', () => {
        it('should return all work hours for a given collaborator', () => __awaiter(void 0, void 0, void 0, function* () {
            const workHours = [
                { collaboratorId: '1', date: '2023-01-01', inOrOut: [] },
                { collaboratorId: '1', date: '2023-01-02', inOrOut: [] },
            ];
            WorkedHours.findAll.mockResolvedValue(workHours);
            const result = yield service.getWorkHoursByCollaborator('1');
            expect(WorkedHours.findAll).toHaveBeenCalledWith({ where: { collaboratorId: '1' } });
            expect(result).toEqual(workHours);
        }));
    });
});
