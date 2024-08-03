import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (userId.trim() === '') {
            setError('User ID is required');
            return;
        }

        navigate(`/${userId}`);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <h1 className="text-center me-3">{t('pages.login.primary-title')}</h1>
                        <h1 className="text-center fw-bold">{t('pages.login.secondary-title')}</h1>
                    </div>


                    <Form onSubmit={handleSubmit} className="mt-5">
                        <Form.Group controlId="userId">
                            <Form.Control
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder={t('pages.login.userCode')}
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button type="submit" variant="warning" className="w-100 mt-3">{t('pages.login.confirm')}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
