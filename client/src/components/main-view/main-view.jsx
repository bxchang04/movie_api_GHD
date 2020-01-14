//first example in 3.4
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export class MainView extends React.Component {

  //executed at the point component is created
  constructor() {
    super();

    //why do these have to be copy/pasted as const in render? seems redundant. Maybe thats why FP or non class based components are the new paradigm?
    this.state = {
      movies: [],
      user: null,
      email: '',
      birthday: '',
      userInfo: {}
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null

    });
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get('https://myFlixDB2.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser(token) {
    axios
      .get('https://myFlixDB2.herokuapp.com/users/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoggedUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.Username);
  }

  render() {
    //wnat are reasons for having movies as state vs. prop, and vice versa?
    const { movies, user, userInfo, token } = this.state;

    //Show loading message
    if (!movies) return <div className="loader">Loading movies...</div>;

    //Return list of movies
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
        <Container className="container-fluid">
          <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
              <Button> {/* placeholder until I get a logo */}
                <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">&nbsp;&nbsp;&nbsp;myFlix</Navbar.Brand>
              </Button>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Link component={RouterLink} to={`/users/${user}`} >
                <Button variant="light mr-1" size="lg" className="profile-button">{user}'s Profile</Button>
              </Link>
              <Button variant="primary ml-1" size="lg" className="logout-button" onClick={() => this.handleLogout()}>Log out</Button>
              </Navbar.Collapse>
            </Navbar>

          <Row>
            {/*<Col key={movies._id} xs={12} sm={6} md={4}>*/} {/*movies._id does not work */}
              <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m}/>)
              }
              }/>
            {/*</Col>*/}
          </Row>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
            } />
          <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
            } />
            <Route path="/users/:Username" render={({ match }) => { return <ProfileView userInfo={userInfo} /> }} />
            <Route path="/update/:Username" render={() => <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} />}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
/*
      <div className="main-view">
        <Button className="logout" variant="info" onClick={() => this.handleLogout()} >
          Log out
        </Button><Container>
          <Row>
            {selectedMovie
               ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)}/>
               : movies.map(movie => (

                 <Col key={movie._id} xs={12} sm={6} md={4}>
                   <MovieCard key={movie._id} movie={movie} onClick={() => this.onMovieClick(movie)}/>
                 </Col>
               ))
            }
          </Row>
        </Container>
      </div>
*/
