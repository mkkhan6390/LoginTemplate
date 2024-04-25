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
  const [pincode, setPincode] = useState('')
  const [formData, setFormData] = useState(
    {
      fullname: null,
      phone: null,
      email: null,
      password: null,
      confirmpassword: null,
      adhaar: null,
      address: null
    })

  const placeholders =
  {
    fullname: 'Full Name',
    phone: 'Mobile Number',
    email: 'Email id',
    password: 'Password',
    confirmpassword: 'Confirm Password',
    adhaar: '12 digit Adhaar number',
    pincode: 'Enter pincode to fetch Address',
    address: 'Address'
  }


  const handlePincode = (e) => {
    setPincode(e.target.value)
    
    if(e.target.value.length === 6)
      axios.get(`http://localhost:3005/getAddress?pincode=${e.target.value}`)
    .then(res=>setFormData(prevdata=>({...prevdata, address:[...new Set(Object.values(res.data[0]).reverse().slice(1,))].join(', ')})))
    .catch(err=>console.log(err))
  }

  const handlefieldvalue = (field, value) => {
    setFormData(prevdata => ({
      ...prevdata,
      [field]: value
    }));
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    event.stopPropagation();
    console.log('Form submitted')
  }

  const handleCancel = () => {
    console.log('Form cancelled')
  }

  return (
    <React.Fragment>

      <Container fluid>
        <Form validated={validated} onSubmit={handleSubmit} onReset={handleCancel}>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Control required name='fullname' placeholder={placeholders.fullname} value={formData.fullname} onChange={(e) => handlefieldvalue('fullname', e.target.value)} type="text" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                <Form.Control pattern="^\d{8,10}$" required name='phone' placeholder={placeholders.phone} value={formData.phone} onChange={(e) => handlefieldvalue('phone', e.target.value)} type="tel" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" >
                <Form.Control name='email' placeholder={placeholders.email} value={formData.email} onChange={(e) => handlefieldvalue('email', e.target.value)} type="email" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className="mb-3" >
              <Form.Control pattern='^\d{6}$' name='pincode' placeholder={placeholders.pincode} value={pincode} onChange={handlePincode} type="text" />
            </Form.Group>
          </Row>
          OR
          <Row>
            <Form.Group className="mb-3" >
              <Form.Control name='address' placeholder={placeholders.address} value={formData.address} onChange={(e) => handlefieldvalue('address', e.target.value)} type="text" />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                <Form.Control name='adhaar' placeholder={placeholders.adhaar} value={formData.city} onChange={(e) => handlefieldvalue('adhaar', e.target.value)} type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" >
                <Form.Control required name='password' placeholder={placeholders.password} value={formData.password} onChange={(e) => handlefieldvalue('password', e.target.value)} type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" >
                <Form.Control required name='confirmpassword' placeholder={placeholders.confirmpassword} value={formData.confirmpassword} onChange={(e) => handlefieldvalue('confirmpassword', e.target.value)} type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='mx-auto my-3'>
              <Form.Group className="mb-3" >
                <Form.Check
                  inline
                  label="I have read and agree to the terms"
                  name="terms_checkbox"
                  type="checkbox"
                  id={`inline-checkbox-1`}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please agree to the terms to proceed.
                </Form.Control.Feedback>
              </Form.Group>
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