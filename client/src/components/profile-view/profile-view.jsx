import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'
// import profileLogo from '/images/user_icon.svg';

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
      favoriteMovies: []
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

  deleteMovieFromFavs(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios.delete(`https://myFlixDB2.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${favoriteMovie}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert('Oops... something went wrong...');
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, email, birthday, favoriteMovies } = this.state;

    return (
      <Card className="profile-view" style={{ width: '32rem' }}>
        {/*<Card.Img className="profile-logo" variant="top" src={profileLogo} />*/}
        <Card.Body>
          <Card.Title className="profile-title">My Profile</Card.Title>
          <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>Password:******* </ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
            <ListGroup.Item>Favorite Movies:
             <div>
                {favoriteMovies.length === 0 &&
                  <div className="value">No Favorite Movies have been added</div>
                }
                {favoriteMovies.length > 0 &&
                  <ul>
                    {favoriteMovies.map(favoriteMovie =>
                      (<li key={favoriteMovie}>
                        <p className="favoriteMovies">
                          {JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === favoriteMovie).Title}
                        </p>
                        <Link to={`/movies/${favoriteMovie}`}>
                          <Button size="sm" variant="info">Open</Button>
                        </Link>
                        <Button variant="secondary" size="sm" onClick={(event) => this.deleteMovieFromFavs(event, favoriteMovie)}>
                          Delete
                        </Button>
                      </li>)
                    )}
                  </ul>
                }
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-center">
            <Link to={`/`}>
              <Button className="button-back" variant="outline-info">MOVIES</Button>
            </Link>
            <Link to={`/update/:Username`}>
              <Button className="button-update" variant="outline-secondary">Update profile</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
