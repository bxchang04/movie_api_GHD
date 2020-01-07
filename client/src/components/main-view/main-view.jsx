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

  onLoggedIn(user) {
    this.setState({
      user
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

/* second example 3.3 -- does not work. Also, why does my block comment not work? (see line 95)
import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

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
