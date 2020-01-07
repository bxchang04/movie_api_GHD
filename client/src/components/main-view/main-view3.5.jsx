//first example in 3.4
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  // One of the "hooks" available in a React Component
   componentDidMount() {
     axios.get('https://myFlixDB2.herokuapp.com/movies')
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //updated for 3.5
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
      {selectedMovie
         ? <MovieView movie={selectedMovie}/>
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
         ))
      }
     </div>
    );
  }
}



/* second example in 3.4 -- does not work. Also, why does my block comment not work? (see line 95)

import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    console.log(username, password);
    /* Send a request to the server for authentication */
//    props.onLoggedIn(username) //uncommented, per exercise instructions
//  };

/*
  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
*/
