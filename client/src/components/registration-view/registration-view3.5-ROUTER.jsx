//Official docs -- https://reactjs.org/docs/uncontrolled-components.html

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import axios from 'axios'; //for 3.5

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, birthday, email);
    // send a request to the server for authentication
    // workaround for authentication
    props.onLoggedIn(username);
  };

    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter desired username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Must be six digits or more" />
          </Form.Group>

          <Form.Group controlId="formBasicBirthdate">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="birthday" placeholder="mm-dd-yyyy" />
            <Form.Text className="text-muted">
            We'll never share your birthday with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit"                 onClick={handleSubmit}>
            Register!
          </Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {/*How does this lead to login-view?*/}
          <Button variant='primary'onClick={() => props.onClick()}>
            Already a member?
          </Button>
        </Form>
      </Container>
    );
}

//is this needed?
// RegistrationView.propTypes = {
//   onSignedIn: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired
// };
