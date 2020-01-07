//Official docs -- https://reactjs.org/docs/uncontrolled-components.html

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      //From https://react-bootstrap.github.io/components/forms/
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
          <Form.Control type="birthday" placeholder="mm-dd-yyyy" /> //not sure if this line will work
          <Form.Text className="text-muted">
          We'll never share your birthday with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
