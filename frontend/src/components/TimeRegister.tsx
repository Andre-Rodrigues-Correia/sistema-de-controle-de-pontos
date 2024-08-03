import React, { useCallback } from 'react';
import moment from 'moment';
import { Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";

const formatTime = () => moment().format('HH:mm:ss');

const notify = (action: string, time: string) => {
    toast.info(`Registro de ${action} realizado às ${time}`);
};

interface TimeRegisterProps {
    onTimeRegistered: (newTime: string) => void;
    hoursArray: (string | null)[];
}

const TimeRegister: React.FC<TimeRegisterProps> = ({ onTimeRegistered, hoursArray }) => {
    const { t } = useTranslation();
    const handleButtonClick = useCallback(() => {
        const newTime = formatTime();
        onTimeRegistered(newTime);

        const action = hoursArray.length % 2 === 0 ? t('pages.timerRegister.entry') : t('pages.timerRegister.exit');
        notify(action, newTime);
    }, [onTimeRegistered, hoursArray]);

    const buttonLabel = hoursArray.length % 2 === 0 ? t('pages.timerRegister.registerEntry') : t('pages.timerRegister.registerExit');

    return (
        <Container>
            <Button className="w-100 point-button" onClick={handleButtonClick}>
                {buttonLabel}
            </Button>
            <ToastContainer />
        </Container>
    );
};

export default TimeRegister;
