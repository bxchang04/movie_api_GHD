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

  deleteFavorite(movieId) {
    axios.delete(`https://myFlixDB2.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`, {
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, userProfile, email, birthday, favoriteMovies } = this.state;

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
              <h4 className="mt-4 mb-4">My favorite movies: </h4>
              {/*{userProfile.favoriteMovies.length === 0 &&*/}
              {favoriteMovies.length === 0 &&
                <div>You have no favorite movies</div>}
              {/*{userProfile.favoriteMovies.length > 0 &&*/}
              {favoriteMovies.length > 0 &&
                <ul className="ml-0 pl-0">
                  {favoriteMovies.map(movie =>
                    (
                      <li key={movie._id} className="mb-2">
                        <span className="d-flex align-items-center">
                          <Button variant="primary" size="sm" className="delete-movie mr-2" onClick={e => this.deleteFavorite(movie._id)}>
                            <i className="material-icons bin">delete</i>
                          </Button>
                          <Link to={`/movies/${movie._id}`}>
                            <h5 className="movie-link link">{movie.Title}</h5>
                          </Link>
                        </span>
                      </li>
                    ))}
                </ul>
              }
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
