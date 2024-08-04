import React, { useState, useEffect } from 'react';
import apiClient from "../plugins/apiClient";
import WorkedHoursDisplay from "../components/WorkedHoursDisplay";
import TimeRegister from "../components/TimeRegister";
import ListPreviousWorkedDays from "../components/ListPreviousWorkedDays";
import { useParams } from "react-router-dom";
import moment from "moment";
import {useTranslation} from "react-i18next";
import { Container, Row, Image} from 'react-bootstrap';
import CollaboratorInterface from "../interfaces/CollaboratorInterface";

const WorkHoursPage: React.FC = () => {
    const [hoursArray, setHoursArray] = useState<string[]>([]);
    const [workedDays, setWorkedDays] = useState<CollaboratorInterface[]>([]);
    const { collaboratorId } = useParams<{ collaboratorId: string }>();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await apiClient.get(`/api/worked-hours/${collaboratorId}`);
                setWorkedDays(response.data)
                await updateWorkDay(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientData();
    }, [collaboratorId]);

    const updateWorkDay = async (collaboratorData: CollaboratorInterface[]) => {
        const today = moment().format("YYYY-MM-DD");
        const todayData = collaboratorData.find(c => c.date === today);

        if (todayData) {
            setHoursArray(todayData.inOrOut);
        } else {
            const response = await apiClient.post(`/api/worked-hours/${collaboratorId}`, {
                date: today,
                inOrOut: []
            });
            setHoursArray(response.data.inOrOut);
        }
    };

    const handleTimeRegistered = async (newTime: string) => {
        setHoursArray(prev => [...prev, newTime]);
        const newData = {
            date: moment().format("YYYY-MM-DD"),
            inOrOut: [...hoursArray, newTime]
        };
        await apiClient.put(`/api/worked-hours/${collaboratorId}`, newData);
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <Container className="mt-5">
            <Row className="d-flex flex-column justify-content-center align-items-center p-4 text-center w-75 w-md-50 mx-auto shadow  rounded-2">
                <h4 className="mb-4">{t('pages.registerPoints.title')}</h4>
                <Image
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png"
                    alt="Profile"
                    className="img-thumbnail rounded-circle mb-1"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <p>{collaboratorId}</p>
                <WorkedHoursDisplay hoursArray={hoursArray} />
                <TimeRegister onTimeRegistered={handleTimeRegistered} hoursArray={hoursArray} />
                <ListPreviousWorkedDays workDays={workedDays} />
            </Row>
        </Container>


    );
};

export default WorkHoursPage;
