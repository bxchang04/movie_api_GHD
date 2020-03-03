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

//limit width of username and password fields

  return (
    <Media className="d-flex flex-column flex-md-row align-items-center">
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
          {/* study this */}
          <Link to={`/register`}>
            <Button variant="link" className="sign-up-link btn-lg" type="submit">Register</Button>
          </Link>
      </Form>
    </Media>
  )
}

//doesn't matter about rendering or calling -- these requirements just send an error message if they are violated.
// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired //is this required??
// };
