import { useEffect, useState } from 'react';
import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { Form, Button } from 'react-bootstrap';

function LoginPage(props) {

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(
        {
            user: null,
            password: null,
            remember_me: null
        })

    const placeholders =
    {
        user: 'Registered Phone or Email',
        password: 'Password',
    }




    const handlefieldvalue = (field, value) => {
        setFormData(prevdata => ({
            ...prevdata,
            [field]: value
        }));
    }

    const handleSubmit = () => {
        console.log('Form submitted')
    }

    const handleCancel = () => {
        console.log('Form cancelled')
    }
    // const isValidEmail = (!validateEmail) || (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
    // const isValidPassword = (!validatePassword) || (/[A-Z]/.test(password) && /[\d]/.test(password) && /[\W]/.test(password) && /^[A-Za-z\d\W]{8,15}$/.test(password));
    // const isValidPhone = (!validatePhone) || (/^[0-9]{10}$/.test(phone));

    return (
        <React.Fragment>

            <Container fluid>
                <Form noValidate validated={validated} onSubmit={handleSubmit} onReset={handleCancel}>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                {/* <Form.Label>Phone or Email</Form.Label> */}
                                <Form.Control required name='user' placeholder={placeholders.user} value={formData.user} onChange={(e) => handlefieldvalue('user', e.target.value)} type="text" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control required name='password' placeholder={placeholders.password} value={formData.password} onChange={(e) => handlefieldvalue('password', e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mx-3 my-3'>
                            <Form.Check
                                inline
                                label="Remember Me"
                                name="remember_me"
                                type="checkbox"
                                id={`inline-checkbox-1`}
                            />
                        </Col>

                        <Col className='mx-3 my-3'>
                            <a href='#'>
                                Forgot password?
                            </a>
                        </Col>
                    </Row>
                    <Row className='w-90 mx-auto'>
                    <Button type="submit" className='mx-1' title='Login' variant="primary" >
                        Login
                    </Button>
                    </Row>
                </Form>
            </Container>

        </React.Fragment>
    );
}

export default LoginPage;