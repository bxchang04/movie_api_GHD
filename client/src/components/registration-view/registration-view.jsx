//Doesn't work if user already exists

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myFlixDB2.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
    // props.onLoggedIn(data); //props.onSignedOn(username) or data //not needed in 3.5?
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => createEmail(e.target.value)} />
        <Form.Text className="text-muted">
        We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => createUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Must be six digits or more" value={password} onChange={e => createPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" placeholder="mm-dd-yyyy" value={birthday} onChange={e => createBirthday(e.target.value)} />
          <Form.Text className="text-muted">
          We'll never share your birthday with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
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

//not sure why this doesn't work for me, but works for healthy potatoes
RegistrationView.propTypes = {
  // onSignedIn: PropTypes.func.isRequired, //commented out to avoid an error
  // onLoggedIn: PropTypes.func.isRequired, //alternative to above. Also commented out to avoid error
  // onClick: PropTypes.func.isRequired //also commented out to avoid error
};
