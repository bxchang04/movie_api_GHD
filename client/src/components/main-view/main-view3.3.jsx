import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { withRouter } from 'react-router-dom';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null
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

  render() {
    const { movies, selectedMovie } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        { selectedMovie
          ? <MovieView
              movie={selectedMovie}
              onClick={() => this.onMovieClick(null)}
            />
            /*in movie-view, is the button's onClick() function the reason this is triggered? Also how come this comment doesn't need to be in {}, but in movie-view I had to wrap my comment in {} to prevent an error? Both are .jsx files */
          : movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        }

      </div>
    );
  }
}
