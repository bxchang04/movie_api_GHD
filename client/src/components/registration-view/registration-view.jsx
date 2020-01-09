//Official docs -- https://reactjs.org/docs/uncontrolled-components.html

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import axios from 'axios'; //for 3.5

//where did this come from?
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

  /* from 3.5
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.input = React.createRef();
    }

  handleSubmit(event) {
axios.post('https://myFlixDB2.herokuapp.com/movies/users', {
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
alert('A name was submitted: ' + this.input.current.value);
event.preventDefault();
}
*/

//update with createUsername, password, email, dob. See examples.
/*From https://react-bootstrap.github.io/components/forms/*/
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="password" placeholder="Enter desired username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Must be six digits or more" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicBirthdate">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="birthday" placeholder="mm-dd-yyyy" />
            <Form.Text className="text-muted">
            We'll never share your birthday with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit"                 onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
