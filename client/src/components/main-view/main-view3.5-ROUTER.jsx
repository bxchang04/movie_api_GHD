//refer to non router ver of 3.5 for registration, back buttons, favorite buttons, bootstrap code
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
import { UpdateView } from '../profile-view/update-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';

export class MainView extends React.Component {

  constructor() {
    super();

    //why do these have to be copy/pasted as const in render? seems redundant. Maybe thats why FP or non class based components are the new paradigm?
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false, //why false and not null?
      // filterString: null //not sure if this needs to be initialized
    };
  }

  //check this
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

  /*
  Why does his version of getMovies differ?

  https://github.com/joannamaciolek/my-Flix-movie-app/blob/master/client/src/components/main-view/main-view.jsx

  getMovies(token) {
    axios.get('https://my-flix-1098.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        localStorage.setItem('movies', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  */

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false,
    });
  }

  register() {
    this.setState({
      register: true
    });
  }

  alreadyMember() {
    this.setState({
      register: false
    })
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
  //sample submission had this-- what is it for?
  //this.props.setLoggedUser(authData.user);
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
  }

  //add logOut function 3.5
  // Perhaps you’re wondering how you can log out as a user. To do so, you can add a new button in your application’s MainView and add an onClick handler, where you delete the token and the user from localStorage—as simple as that!
  //
  // To delete the token and the user from localStorage, you need to use the following commands:
  //
  // localStorage.removeItem('token');
  //
  // localStorage.removeItem('user');


/*  //filter feature -- test this, and add input field somewhere
  onFilterChange = (event) => {
    this.setState({
      filterString: event.target.value
    });
  }*/

  render() {
    const { movies, selectedMovie, user, register, filterString } = this.state;

    // may neeed this below for registration to work. Refer to approved ver. of 3.4 only
    // if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />

    //Show loading message
    if (!movies) return <div className="loader">Loading movies...</div>;

    //Return list of movies
    if (!movies) return <div className="main-view"/>;

/*    //filter feature - test this
    const filteredMovies = filterString ? movies.filter(r => r.name.includes(filterString)) : movies;
*/

/*3.5
You'll be asked to do so later in this Exercise, so make sure to display the correct username somewhere in your main view (which will take you to the profile page)*/

    return (
      <Router>
        <div className="main-view">
          {/*Test this*/}
          <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
            <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Link component={RouterLink} to={`/users/${user}`} >
              <Button variant="light mr-1" size="lg" className="profile-button">{user}'s Profile</Button>
            </Link>
            <Button variant="primary ml-1" size="lg" className="logout-button" onClick={() => this.handleLogout()}>Log out</Button>
          </Navbar.Collapse>
          </Navbar>
           <Route exact path="/" render={() => {
              {/* refer to above*/}
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m}/>)
            }
            } />
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
        </div>
      </Router>
    );
  }
}
