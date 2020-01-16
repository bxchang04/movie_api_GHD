import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favoriteMovies: [] //change to props?
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://myFlixDB2.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteFavorite(event, movieID) {
    event.preventDefault();
    axios.delete(`https://myFlixDB2.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        document.location.reload(true);
      })
      .then(res => {
        alert('Movie successfully deleted from favorites');
      })

      .catch(e => {
        alert('Movie could not be deleted from favorites ' + e)
      });
  }

  deleteProfile() {
    axios.delete(`https://myFlixDB2.herokuapp.com/users/${localStorage.getItem('user')}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        alert('Do you really want to delete your account?')
      })
      .then(res => {
        alert('Account was successfully deleted')
      })
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.setState({
          user: null

        });
        window.open('/', '_self');
      })
      .catch(e => {
        alert('Account could not be deleted ' + e)
      });
  }



  render() {
    const { username, email, birthday, favoriteMovies } = this.state;

    return (
      <div className="profile-view">
        <Container>
          <Card style={{ minwidth: '20rem' }} className="border-0 pl-0">
            <Card.Body>
              <span className="d-flex align-items-center mb-4">
              <Link to={`/`}>
                <Button variant="outline-primary" className="sign-up-link btn-lg" type="submit">{'<'}</Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <h1 className="display-4">Profile</h1>
              </span>
              <Card.Text className="mb-4 lead">
                <span className="font-weight-bold">Username: </span>{username} <br />
                <span className="font-weight-bold">Email: </span>{email} <br />
                <span className="font-weight-bold">Birthday: </span>{birthday} <br />
              </Card.Text>
              <Link to={`/update/${username}`}>
                <Button variant="primary" className="update-button">Update my profile</Button>
              </Link>

              <Button variant="primary" className="delete-button ml-2" onClick={() => this.deleteProfile()}>Delete my profile</Button>
            </Card.Body>
          </Card>
          <Container>

            <h4 className="mt-4 mb-4">My favorite movies: </h4>
            {favoriteMovies.length === 0 &&
              <div>You have no favorite movies</div>}
            {favoriteMovies.length > 0 &&
              <ul className="ml-0 pl-0">
                  {favoriteMovies.map(favoriteMovie =>
                    (<li key={favoriteMovie}>
                      <span className="d-flex align-items-center mb-4">
                        <Link to={`/movies/${favoriteMovie}`}>
                          {JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === favoriteMovie).Title}
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="outline-danger" size="sm" onClick={(event) => this.deleteFavorite(event, favoriteMovie)}>
                        Delete
                        </Button>
                      </span>
                    </li>)
                  )}
              </ul>
            }
          </Container>
        </Container>
      </div >
    );
  }
}
