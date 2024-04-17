import './App.css';
import SignupPage from './Signup';
import LoginPage from './Login';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';

function App() {
  const [key, setKey] = useState('Login');

  return (
    <div>
      <Container fluid style={{width:'30vw'}}>

        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>

          <Nav variant="underline" className='nav justify-content-center'>
            <Nav.Link eventKey="Login">Log in</Nav.Link>
            <Nav.Link eventKey="Signup">Sign up</Nav.Link>
          </Nav>

          <Tab.Content className="mt-3" >
            <Tab.Pane eventKey="Login">
            <LoginPage/>
            </Tab.Pane>
          </Tab.Content>

          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="Signup">
              <SignupPage />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </Container>


    </div>
  );
}

export default App;
