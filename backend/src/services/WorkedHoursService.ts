import models from '../models';

const { WorkedHours } = models;

export class WorkedHoursService {
    async createOrUpdateWorkHours(collaboratorId: string, date: string, hoursWorked: string) {
        let workHours = await WorkedHours.findOne({ where: { collaboratorId, date } });

        if (!workHours) {
            workHours = await WorkedHours.create({ collaboratorId, date, hoursWorked });
            return workHours
        }

        workHours.hoursWorked = hoursWorked;
        await workHours.save();

        return workHours;
    }

    async getWorkHoursByCollaborator(collaboratorId: string) {
        const workHours = await WorkedHours.findAll({ where: { collaboratorId } });

        if (workHours.length === 0) {
            throw new Error('No work hours found for this employee');
        }

        return workHours;
    }
}
