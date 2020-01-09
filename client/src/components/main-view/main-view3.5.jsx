//first example in 3.4
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registration: null //no idea if this works
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
   //uncomment below and delete above once 3.5 errors are solved.
   // componentDidMount() {
   //   let accessToken = localStorage.getItem('token');
   //   if (accessToken !== null) {
   //     this.setState({
   //       user: localStorage.getItem('user')
   //     });
   //     this.getMovies(accessToken);
   //   }
   // }


  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
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

  //button to return back -- confer https://github.com/tdnicola/healthyPotatoes_movieApp/blob/380152513bf00cb09f26feaa0738f04eeaec20d5/client/src/components/registration-view/registration-view.jsx
  //ask why back button stopped working
    onButtonClick() {
      this.setState({
      selectedMovie: null
    });
    }

  //test this -- confer https://github.com/tdnicola/healthyPotatoes_movieApp/blob/380152513bf00cb09f26feaa0738f04eeaec20d5/client/src/components/registration-view/registration-view.jsx
    onRegister(registration) {
    this.setState({
      registration
    });
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie
               ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()}/>
               : movies.map(movie => (

                 <Col key={movie._id} xs={12} sm={6} md={4}>
                   {/*why is this this.onMovieClick(movie) only for the OPEN link, and not the column's container? Check movie-card.*/}
                   <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                 </Col>
               ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}
