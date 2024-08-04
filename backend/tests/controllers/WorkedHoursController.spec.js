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
Object.defineProperty(exports, "__esModule", { value: true });
const WorkedHoursService_1 = require("../../src/services/WorkedHoursService");
const workHoursController_1 = require("../../src/controllers/workHoursController");
jest.mock('../../src/services/WorkedHoursService');
describe('WorkedHoursController', () => {
    let workedHoursService;
    let controller;
    let req;
    let res;
    beforeEach(() => {
        workedHoursService = new WorkedHoursService_1.WorkedHoursService();
        controller = new workHoursController_1.WorkedHoursController(workedHoursService);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe('createWorkHours', () => {
        it('should create work hours and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: [] };
            workedHoursService.createWorkHours.mockResolvedValue(mockWorkHours);
            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', hoursWorked: '8' };
            yield controller.createWorkHours(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockWorkHours);
            expect(workedHoursService.createWorkHours).toHaveBeenCalledWith('1', '2023-01-01');
        }));
        it('should return 500 status on error', () => __awaiter(void 0, void 0, void 0, function* () {
            workedHoursService.createWorkHours.mockRejectedValue(new Error('Internal server error'));
            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01' };
            yield controller.createWorkHours(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        }));
    });
    describe('updateInOrOut', () => {
        it('should update inOrOut and return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUpdatedWorkHours = { collaboratorId: '1', date: '2023-01-01', inOrOut: ['08:00:00'] };
            workedHoursService.updateInOrOut.mockResolvedValue(mockUpdatedWorkHours);
            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', inOrOut: ['08:00:00'] };
            yield controller.updateInOrOut(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedWorkHours);
            expect(workedHoursService.updateInOrOut).toHaveBeenCalledWith('1', { date: '2023-01-01', inOrOut: ['08:00:00'] });
        }));
        it('should return 500 status on error', () => __awaiter(void 0, void 0, void 0, function* () {
            workedHoursService.updateInOrOut.mockRejectedValue(new Error('Internal server error'));
            req.params = { collaboratorId: '1' };
            req.body = { date: '2023-01-01', inOrOut: ['08:00:00', '12:00:00'] };
            yield controller.updateInOrOut(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        }));
    });
    describe('getWorkHoursByEmployee', () => {
        it('should return work hours and 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockWorkHours = [
                { collaboratorId: '1', date: '2023-01-01', inOrOut: [] },
                { collaboratorId: '1', date: '2023-01-02', inOrOut: [] },
            ];
            workedHoursService.getWorkHoursByCollaborator.mockResolvedValue(mockWorkHours);
            req.params = { collaboratorId: '1' };
            yield controller.getWorkHoursByEmployee(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockWorkHours);
            expect(workedHoursService.getWorkHoursByCollaborator).toHaveBeenCalledWith('1');
        }));
        it('should return 500 status on error', () => __awaiter(void 0, void 0, void 0, function* () {
            workedHoursService.getWorkHoursByCollaborator.mockRejectedValue(new Error('Internal server error'));
            req.params = { collaboratorId: '1' };
            yield controller.getWorkHoursByEmployee(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        }));
    });
});
