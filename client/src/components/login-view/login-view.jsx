import React from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
  }

  //https://react-bootstrap.github.io/components/forms/
  render() {
    return (
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Username" />
          </Col>
          <Col>
            <Form.Control placeholder="Password" />
          </Col>
        </Row>
        <Row>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Row>
      </Form>
    );
  }
}
