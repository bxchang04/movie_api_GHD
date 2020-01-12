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

  //executed after the point component is mounted (rendered). But why is this not included after render, per the diagram?
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

  //why is this (movie) but function below ()?
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

  //confer https://github.com/tdnicola/healthyPotatoes_movieApp/blob/380152513bf00cb09f26feaa0738f04eeaec20d5/client/src/components/registration-view/registration-view.jsx

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
          {/* Make onClick required? Study why or why not this is needed. Also, changing onButtonClick to onMovieClick fixed the broken back button for 3.4. Added null as argument.*/}
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
