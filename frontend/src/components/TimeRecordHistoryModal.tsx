import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import {useTranslation} from "react-i18next";

interface WorkHoursModalProps {
    show: boolean;
    onClose: () => void;
    hoursArray: (string | null)[];
}

const TimeRecordHistoryModal: React.FC<WorkHoursModalProps> = ({ show, onClose, hoursArray }) => {
    const { t } = useTranslation();
    const formatHoursArray = (hoursArray: (string | null)[]): string[] => {
        let result: string[] = [];
        for (let i = 0; i < hoursArray.length; i += 2) {
            if (hoursArray[i] && hoursArray[i + 1]) {
                result.push(`Entrada ${Math.floor(i / 2) + 1}: ${hoursArray[i]}, Saída ${Math.floor(i / 2) + 1}: ${hoursArray[i + 1]}`);
            }
        }
        return result;
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>{t('components.workHoursModal.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-content-custom">
                {formatHoursArray(hoursArray).length > 0 ? (
                    <ul>
                        {formatHoursArray(hoursArray).map((entry, index) => (
                            <li key={index}>{entry}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('components.workHoursModal.notData')}</p>
                )}
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={onClose}>
                    {t('buttons.close')}
                </Button>
            </Modal.Footer>
        </Modal>


    );
};

export default TimeRecordHistoryModal;
