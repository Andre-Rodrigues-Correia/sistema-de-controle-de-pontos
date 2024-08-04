import apiClient from "../plugins/apiClient";
import moment from "moment";
import CollaboratorInterface from "../interfaces/CollaboratorInterface";

class WorkHoursService {
    async fetchClientData(collaboratorId: string): Promise<CollaboratorInterface[]> {
        const response = await apiClient.get(`/api/worked-hours/${collaboratorId}`);
        return response.data;
    }

    async updateWorkDay(collaboratorId: string, collaboratorData: CollaboratorInterface[]): Promise<string[]> {
        const today = moment().format("YYYY-MM-DD");
        const todayData = collaboratorData.find(c => c.date === today);

        if (todayData) {
            return todayData.inOrOut;
        } else {
            const response = await apiClient.post(`/api/worked-hours/${collaboratorId}`, {
                date: today,
                inOrOut: []
            });
            return response.data.inOrOut;
        }
    }

    async handleTimeRegistered(collaboratorId: string, newTime: string, hoursArray: string[]): Promise<void> {
        const newData = {
            date: moment().format("YYYY-MM-DD"),
            inOrOut: [...hoursArray, newTime]
        };
        await apiClient.put(`/api/worked-hours/${collaboratorId}`, newData);
    }
}

export default new WorkHoursService();
