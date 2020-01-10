//first example in 3.4
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false //why false and not null?
    };
  }

  componentDidMount() {
   axios.get('https://myFlixDB2.herokuapp.com/movies')
     .then(response => {
       this.setState({
         movies: response.data
       });
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onButtonClick() {
    this.setState({
    selectedMovie: null
  });
  }

  //confer https://github.com/tdnicola/healthyPotatoes_movieApp/blob/380152513bf00cb09f26feaa0738f04eeaec20d5/client/src/components/registration-view/registration-view.jsx

/*  onSignedIn(user) {
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
  }*/


  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //Understand this before implementing
    /*if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />
    */

    if (!movies) return <div className="main-view"/>; //only occurs for a second. Like an initialization.

    return (
      <div className="main-view">
        <Container>
          <Row>
          {/* Make onClick required. Study why or why not this is needed. Practice properties. */}
            {selectedMovie
               ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()}/>
               : movies.map(movie => (

                 <Col key={movie._id} xs={12} sm={6} md={4}>
                   {/*movie = {movie} is (a property?) only for rendering. top to bottom, not left to right.*/}
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
