//first example in 3.4
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

  //executed at the point component is created
  constructor() {
    super();

    //why do these have to be copy/pasted as const in render? seems redundant. Maybe thats why FP or non class based components are the new paradigm?
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false, //why false and not null?
      // filterString: null //not sure if this needs to be initialized
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

  //why is this (movie) but function below ()?
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //extraneous
  // onButtonClick() {
  //   this.setState({
  //     selectedMovie: null
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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

    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; //original code
    if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />

    //Show loading message
    if (!movies) return <div className="loader">Loading movies...</div>;

    //Return list of movies
    if (!movies) return <div className="main-view"/>;

/*    //filter feature - test this
    const filteredMovies = filterString ? movies.filter(r => r.name.includes(filterString)) : movies;
*/

    return (
      <div className="main-view">
        <Container>
          {/* filter feature
          <Row>
            <div className="movie-viewer">
            <input value={filterString} onChange={this.onFilterChange}/>
            { filteredMovies.map(movie => <div className="movie" key={movie._id}>{movie.name}</div>)}
            </div>
          </Row>
          */}
          <Row>
            {selectedMovie
               ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)}/>
               : movies.map(movie => (

                 <Col key={movie._id} xs={12} sm={6} md={4}>
                   {/*key and map go together? key is called an example of an inline ___ (property?)*/}
                   <MovieCard key={movie._id} movie={movie} onClick={() => this.onMovieClick(movie)}/>
                 </Col>
               ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}
