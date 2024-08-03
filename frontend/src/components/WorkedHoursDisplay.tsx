import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import TimeRecordHistoryModal from "./TimeRecordHistoryModal";
import {useTranslation} from "react-i18next"; // Importando o componente modal

interface WorkHoursDisplayProps {
    hoursArray: (string | null)[];
}

const calculateWorkedHours = (hoursArray: (string | null)[]): string => {
    if (hoursArray.length < 1) return '00:00:00';

    let totalSeconds = 0;
    const now = moment();

    for (let i = 0; i < hoursArray.length - 1; i += 2) {
        if (!hoursArray[i] || !hoursArray[i + 1]) continue;

        const start = moment(hoursArray[i], 'HH:mm:ss');
        const end = moment(hoursArray[i + 1], 'HH:mm:ss');

        if (start.isValid() && end.isValid()) {
            const diff = moment.duration(end.diff(start)).asSeconds();
            totalSeconds += diff;
        }
    }

    if (hoursArray.length % 2 !== 0 && hoursArray[hoursArray.length - 1]) {
        const start = moment(hoursArray[hoursArray.length - 1], 'HH:mm:ss');
        if (start.isValid()) {
            const diff = moment.duration(now.diff(start)).asSeconds();
            totalSeconds += diff;
        }
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const WorkedHoursDisplay: React.FC<WorkHoursDisplayProps> = ({ hoursArray }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());
    const [displayedTime, setDisplayedTime] = useState(calculateWorkedHours(hoursArray));
    const { t } = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDisplayedTime(calculateWorkedHours(hoursArray));
    }, [hoursArray, currentTime]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Container className="mb-2">
                <Row className="d-flex align-items-center p-1">
                    <Col className="d-flex justify-content-start" xs={9}>
                        <h6 className="mb-0">
                            <span className="fs-4" style={{ color: "#fe8a00" }}>
                                {displayedTime}
                            </span><br/>
                            {t('pages.workHoursDisplay.title')}
                        </h6>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faEye}
                            onClick={handleShow}
                        />
                    </Col>
                </Row>
            </Container>

            <TimeRecordHistoryModal
                show={showModal}
                onClose={handleClose}
                hoursArray={hoursArray}
            />
        </>
    );
};

export default WorkedHoursDisplay;
