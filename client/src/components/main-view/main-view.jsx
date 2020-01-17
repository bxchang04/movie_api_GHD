//first example in 3.4
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
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
      userInfo: {}
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
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
    this.getUser(authData.token);
    this.getMovies(authData.token);
  }

  //not in exercise
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
      this.props.setMovies(response.data);
      localStorage.setItem("movies", JSON.stringify(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
}

//not in exercise
  getUser(token) {
    let username = localStorage.getItem('user');
    axios
      .get(`https://myFlixDB2.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // this.props.setLoggedUser(response.data);
        this.updateUser(response.data); //refers to main-view. 109. function. Has a lot of use cases. E.g. Angular cheats .this a lot. Rule of thumb -- if you are inside a function in a class, want to communicate with another function of the class, need .this. Example getMovies. Other case - line 100 updateLog, can call it without .this.
      })
      .catch(error => {
        console.log(error);
      });
  }

  //not in exercise
  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.Username);
  }

  render() {
    let { movies } = this.props;
    let { user, userInfo, token } = this.state;

    //Show loading message
    if (!movies) return <div className="loader">Loading movies...</div>;

    //Return list of movies
    // if (!movies) return <div className="main-view"/>;

    return (
      <Router basename="/client">
        <div className="main-view">
        <Container className="container-fluid">
          <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
                <Button>
                <Link component={RouterLink} to={`/`} >
                  <Button variant="light mr-1" size="lg" className="profile-button">&nbsp;&nbsp;myFlix</Button>
                </Link>
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
            <Route exact path="/" render={() => {
               if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
               return <MoviesList movies={movies}/>;
             }} />
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
            <Route path="/update/:Username" render={() => <ProfileUpdate userInfo={userInfo} user={user} updateUser={data => this.updateUser(data)} />}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    // user: state.user //not in exercise. Already state in exercise.
  };
};

export default connect(mapStateToProps, { setMovies } )(MainView); //not in EL
