import React from 'react';
import moment from 'moment';
import { Col, Container, Row } from "react-bootstrap";
import {useTranslation} from "react-i18next";

interface WorkDay {
    date: string;
    inOrOut: (string | null)[];
}
const calculateWorkedHours = (hoursArray: (string | null)[]): string => {
    let totalSeconds = 0;
    let lastTime = null;

    for (let i = 0; i < hoursArray.length; i++) {
        if (!hoursArray[i]) continue;

        const time = moment(hoursArray[i], 'HH:mm:ss');

        if (!time.isValid()) continue;

        if (lastTime) {
            const diff = moment.duration(time.diff(lastTime)).asSeconds();
            totalSeconds += diff;
            lastTime = null;
        } else {
            lastTime = time;
        }
    }

    if (lastTime) {
        const now = moment();
        const diff = moment.duration(now.diff(lastTime)).asSeconds();
        totalSeconds += diff;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

interface WorkHoursListProps {
    workDays: WorkDay[];
}

const WorkHoursList: React.FC<WorkHoursListProps> = ({ workDays }) => {
    const { t } = useTranslation();
    const today = moment().format('YYYY-MM-DD');

    const filteredWorkDays = workDays.filter(day => day.date !== today);

    const renderWorkDays = filteredWorkDays.map((day, index) => {
        const { date, inOrOut } = day;
        const hoursWorked = calculateWorkedHours(inOrOut);


        return (
            <Row key={index} className="d-flex align-items-center mb-2 p-2 border rounded-2">
                <Col className="d-flex justify-content-start">
                    <h6 className="mb-0">{moment(date).format('DD/MM/YYYY')}</h6>
                </Col>
                <Col className="d-flex justify-content-end">
                    <h6 className="mb-0">{hoursWorked}</h6>
                </Col>
            </Row>
        );
    });

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-start">
                <h6 className="mb-2 ">{t('components.listWorkDays.title')}</h6>
            </div>

            {renderWorkDays}
        </Container>
    );
};

export default WorkHoursList;
