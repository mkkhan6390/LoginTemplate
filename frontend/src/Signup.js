import { useEffect, useState } from 'react';
import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { Nav, Tab, Form, Button } from 'react-bootstrap';

function SignupPage(props) {

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    {
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      password: null,
      confirmpassword: null,
      adhaar: null,
      address: null
    })

  const placeholders =
  {
    firstname: 'First Name',
    lastname: 'Last Name',
    phone: 'Mobile Number',
    email: 'Email id',
    password: 'Password',
    confirmpassword: 'Confirm Password',
    adhaar: '12 digit Adhaar number',
    address: 'Address'
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
                {/* <Form.Label>First Name</Form.Label> */}
                <Form.Control required name='firstname' placeholder={placeholders.firstname} value={formData.firstname} onChange={(e) => handlefieldvalue('firstname', e.target.value)} type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Last Name</Form.Label> */}
                <Form.Control required name='lastname' placeholder={placeholders.lastname} value={formData.lastname} onChange={(e) => handlefieldvalue('lastname', e.target.value)} type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Phone</Form.Label> */}
                <Form.Control pattern="^\d{8,10}$" required name='phone' placeholder={placeholders.phone} value={formData.phone} onChange={(e) => handlefieldvalue('phone', e.target.value)} type="tel" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control required name='email' placeholder={placeholders.email} value={formData.email} onChange={(e) => handlefieldvalue('email', e.target.value)} type="email" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className="mb-3" >
              {/* <Form.Label>Address</Form.Label> */}
              <Form.Control required name='address' placeholder={placeholders.address} value={formData.address} onChange={(e) => handlefieldvalue('address', e.target.value)} type="text" />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Adhaar Number</Form.Label> */}
                <Form.Control name='adhaar' placeholder={placeholders.adhaar} value={formData.city} onChange={(e) => handlefieldvalue('adhaar', e.target.value)} type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control required name='password' placeholder={placeholders.password} value={formData.password} onChange={(e) => handlefieldvalue('password', e.target.value)} type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" >
                {/* <Form.Label>Confirm Password</Form.Label> */}
                <Form.Control required name='confirmpassword' placeholder={placeholders.confirmpassword} value={formData.confirmpassword} onChange={(e) => handlefieldvalue('confirmpassword', e.target.value)} type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className='mx-auto my-3'>
              <Form.Check
                inline
                label="I have read and agree to the terms"
                name="terms_checkbox"
                type="checkbox"
                id={`inline-checkbox-1`}
              />
            </Col>
          </Row>

          <Row className='w-90 mx-auto'>
            <Button type="submit" className='mx-1' title='Signup' variant="primary" >
              Sign Up
            </Button>
          </Row>
        </Form>
      </Container>

    </React.Fragment>
  );
}

export default SignupPage;