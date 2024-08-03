import React from 'react';
import moment from 'moment';

interface WorkHoursDisplayProps {
    hoursArray: (string | null)[];
}

const calculateWorkedHours = (hoursArray: (string | null)[]): string => {
    if (hoursArray.length < 2) return '00:00:00';

    let totalSeconds = 0;

    for (let i = 0; i < hoursArray.length - 1; i += 2) {
        if (!hoursArray[i] || !hoursArray[i + 1]) continue;

        const start = moment(hoursArray[i], 'HH:mm:ss');
        const end = moment(hoursArray[i + 1], 'HH:mm:ss');

        // Verifica se os momentos são válidos
        if (start.isValid() && end.isValid()) {
            const diff = moment.duration(end.diff(start)).asSeconds();
            totalSeconds += diff;
        }
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const WorkHoursDisplay: React.FC<WorkHoursDisplayProps> = ({ hoursArray }) => {
    return (
        <div>
            <h2>Horas Trabalhadas no Dia</h2>
            <p>{calculateWorkedHours(hoursArray)}</p>
            <p>{JSON.stringify(hoursArray)}</p>
        </div>
    );
};

export default WorkHoursDisplay;
