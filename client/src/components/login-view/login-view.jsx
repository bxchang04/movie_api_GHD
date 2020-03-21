//bootstrap ver

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //didn't work unless I typed credentials into Chrome console. And any name works, even ' '
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myFlixDB2.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <div className="login-view">
      <Row className="container login-container border border-light shadow p-3 mb-5 rounded py-3 px-3 align-items-center" style={{display: 'flex', justifyContent: 'center'}}>
        <Col>
          <Container>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
                <br/><br/>First time user?<br/>
                <Link to={`/register`}>
                  <Button variant="link" className="sign-up-link btn-lg" type="submit">Register</Button>
                </Link>
              </Form>
            </Container>
        </Col>
      </Row>
    </div>
  )
}
