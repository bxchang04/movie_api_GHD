//refer to non router ver of 3.5 for registration, back buttons, favorite buttons, bootstrap code
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
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
  Why does his version differ?

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

  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => {
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
