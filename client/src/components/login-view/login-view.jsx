//bootstrap ver

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username)
  };

  //do I need to add a const registration here? Since onClick requires a proptypes function (onClick: PropTypes.func.isRequired)
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password);
    //or leave param blank? And why no ;?? Also, onRegister is in main-view. onLoggedin is also in main-view. How would I know what is and is not a reference to code outside of this view (.jsx file / component)?
    props.onRegister(registration)
  };

//limit width of username and password fields

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
        <br/><br/>First time user?<br/>
        <Button type="submit" variant="link" onClick={handleRegister}>Click here to register
        </Button>
    </Form>
  )
}

//doesn't matter about rendering or calling -- these requirements just send an error message if they are violated. Should I require onClick? User can just use return to login.
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  //onClick: PropTypes.func.isRequired
};
