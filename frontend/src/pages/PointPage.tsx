import React, { useState, useEffect } from 'react';
import apiClient from "../plugins/apiClient";
import WorkHoursDisplay from "../components/WorkHoursDisplay";
import TimeRegister from "../components/TimeRegister";
import { useParams } from "react-router-dom";
import moment from "moment";

interface Collaborator {
    id: number;
    collaboratorId: string;
    date: string;
    hoursWorked: string[];
    inOrOut: string[]
}

const WorkHours: React.FC = () => {
    const [hoursArray, setHoursArray] = useState<string[]>([]);
    const { collaboratorId } = useParams();
    const [workDay, setWorkDay] = useState<Collaborator | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await apiClient.get(`/api/worked-hours/${collaboratorId}`);
                await verifyAndSetWorkDay(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientData();
    }, [collaboratorId]);

    const handleTimeRegistered = async (newTime: string) => {
        setHoursArray(prevHoursArray => [...prevHoursArray, newTime]);
        const newData = {
            date: moment().format("YYYY-MM-DD").toString(),
            hoursWorked: "00:00:00",
            inOrOut: [...hoursArray, newTime]
        }
        await apiClient.put(`/api/worked-hours/${collaboratorId}`, newData);
    };

    const getToday = () => {
        return moment().format("YYYY-MM-DD").toString();
    };

    const verifyAndSetWorkDay = async (collaboratorData: Collaborator[]) => {
        const today = getToday();
        let isWorkToday = false;
        collaboratorData.forEach((c) => {
            if (c.date === today) {
                setWorkDay(c);
                setHoursArray(c.inOrOut);
                isWorkToday = true;
            }
        });

        if (!isWorkToday) {
            const response = await apiClient.post(`/api/worked-hours/${collaboratorId}`, {
                date: moment().format("YYYY-MM-DD").toString(),
                hoursWorked: "00:00:00",
                inOrOut: []
            });
            setWorkDay(response.data);
            setHoursArray(response.data.inOrOut);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="App">
            <h1>Registro de Ponto</h1>
            <WorkHoursDisplay hoursArray={hoursArray} />
            <TimeRegister onTimeRegistered={handleTimeRegistered} hoursArray={hoursArray} />
        </div>
    );
};

export default WorkHours;
