import models from '../models';

const { WorkedHours } = models;

export class WorkedHoursService {
    public async createWorkHours(collaboratorId: string, date: string) {
        let workHours = await WorkedHours.findOne({ where: { collaboratorId, date } });

        if (!workHours) {
            workHours = await WorkedHours.create({ collaboratorId, date, inOrOut: [] });
        }

        return workHours;
    }

    public async updateInOrOut(collaboratorId: string, collaborator: any) {
        console.log(collaborator)
        const workHours = await WorkedHours.findOne({ where: { collaboratorId, date: collaborator.date } });
    console.log(workHours)
        if (!workHours) {
            throw new Error('Work hours entry not found');
        }

        workHours.inOrOut = [...collaborator.inOrOut];
        await workHours.save();

        return workHours;
    }

    public async getWorkHoursByCollaborator(collaboratorId: string) {
        return await WorkedHours.findAll({ where: { collaboratorId } });
    }
}
