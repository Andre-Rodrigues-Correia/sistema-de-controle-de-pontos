import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface TimeRegisterProps {
    onTimeRegistered: (newTime: string) => void;
    hoursArray: (string | null)[];
}

const TimeRegister: React.FC<TimeRegisterProps> = ({ onTimeRegistered, hoursArray }) => {
    const [currentTime, setCurrentTime] = useState<string>(moment().format('HH:mm:ss'));

    useEffect(() => {
        setCurrentTime(moment().format('HH:mm:ss'));
    }, []);

    const handleButtonClick = () => {
        const newTime = moment().format('HH:mm:ss');
        onTimeRegistered(newTime);
        setCurrentTime(newTime);
    };

    const buttonLabel = hoursArray.length % 2 === 0 ? 'Registrar Entrada' : 'Registrar Saída';

    return (
        <div>
            <button onClick={handleButtonClick}>{buttonLabel}</button>
        </div>
    );
};

export default TimeRegister;
