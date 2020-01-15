import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favorites: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://myFlixDB2.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.FavoriteMovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteMovieFromFavs(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios
      .delete(
        `https://myFlixDB2.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/movies/${favoriteMovie}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.getUser(localStorage.getItem("token"));
      })
      .catch(event => {
        alert("something went wrong.");
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { userData, username, email, birthday, favorites } = this.state;

    return (
      <Card className="profile-view" style={{ width: "32rem" }}>
        <Card.Body>
          <Card.Title className="profile-title">Profile</Card.Title>
          <ListGroup className="user-name">
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>E-Mail: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {birthday}</ListGroup.Item>
            <ListGroup.Item>
              Favorites:
              <div>
                {favorites.length === 0 && (
                  <div className="value">No favorites added</div>
                )}
                {favorites.length > 0 && (
                  <ul>
                    {favorites.map(favoriteMovie => (
                      <li key={favoriteMovie}>
                        <p className="favorites">
                          {
                            JSON.parse(localStorage.getItem("movies")).find(
                              movie => movie._id === favoriteMovie
                            ).Title
                          }
                        </p>
                        <Button
                          className="submitButton"
                          size="sm"
                          onClick={event =>
                            this.deleteMovieFromFavs(event, favoriteMovie)
                          }>
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <div>
          <Link to={`/`}>
            <Button className="submitButton">Back to Movies</Button>
          </Link>
          <Link to={`/update/:Username`}>
            <Button className="submitButton">Update profile</Button>
          </Link>
        </div>
      </Card>
    );
  }
}
