import React, { useState, useEffect } from 'react';
import CollaboratorService from "../services/CollaboratorService";
import WorkedHoursDisplay from "../components/WorkedHoursDisplay";
import TimeRegister from "../components/TimeRegister";
import ListPreviousWorkedDays from "../components/ListPreviousWorkedDays";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Image } from 'react-bootstrap';
import CollaboratorInterface from "../interfaces/CollaboratorInterface";
import LoadSpinner from "../components/generic/LoadSpinner";

const WorkHoursPage: React.FC = () => {
    const [hoursArray, setHoursArray] = useState<string[]>([]);
    const [workedDays, setWorkedDays] = useState<CollaboratorInterface[]>([]);
    const { collaboratorId } = useParams<{ collaboratorId: string }>();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        if (!collaboratorId) {
            console.error('Collaborator ID is required');
            setLoading(false);
            return;
        }

        const fetchClientData = async () => {
            try {
                const data = await CollaboratorService.fetchClientData(collaboratorId);
                setWorkedDays(data);
                const updatedHoursArray = await CollaboratorService.updateWorkDay(collaboratorId, data);
                setHoursArray(updatedHoursArray);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientData();
    }, [collaboratorId]);

    const handleTimeRegistered = async (newTime: string) => {
        if (!collaboratorId) {
            console.error('Collaborator ID is required');
            return;
        }

        setHoursArray(prev => [...prev, newTime]);
        await CollaboratorService.handleTimeRegistered(collaboratorId, newTime, hoursArray);
    };

    if (loading) return <LoadSpinner />;

    return (
        <Container className="mt-5">
            <Row className="d-flex flex-column justify-content-center align-items-center p-4 text-center w-75 w-md-50 mx-auto shadow rounded-2">
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
