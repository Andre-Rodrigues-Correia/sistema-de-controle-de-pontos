// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (userId.trim() === '') {
            setError(t('userId') + ' ' + t('is_required'));
            return;
        }
        
        navigate(`/${userId}`);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="shadow p-4">
                    <div className="d-flex flex-row justify-content-center">
                        <h1 className="text-center pe-3">{t('pages.login.primary-title')}</h1>
                        <h1 className="text-center fw-bold">{t('pages.login.secondary-title')}</h1>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="userId">
                        <Form.Label>{t('pages.login.userCode')}:</Form.Label>
                            <Form.Control
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder={t('pages.login.placeholder')}
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button type="submit"
                                className="w-100 point-button mt-3">{t('pages.login.confirm')}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
