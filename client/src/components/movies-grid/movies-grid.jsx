//review with Hugo

import React from 'react';
import PropTypes from 'prop-types';

// import app components
import { MovieCard } from '../movie-card/movie-card';

// imports for files to bundle
import './movies-grid.scss';

export function MoviesGrid(props) {

  const { movies, title, user, userProfile, onToggleFavourite } = props;

  return (
    (movies && (movies.length > 0)) &&
    (<React.Fragment>
      {title && (<React.Fragment><h5>{title}</h5><br /></React.Fragment>)}
      <div className="movies-grid card-deck">
          {movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onToggleFavourite={movieId => onToggleFavourite(movieId)}
            isFavorite={user && userProfile && userProfile.FavoriteMovies.includes(movie._id)}
            user={user}
          />
          ))}
        </div>
      </React.Fragment>
    )
  );
}

MoviesGrid.propTypes = {

  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.exact({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })
    })
  ),
  onToggleFavourite: PropTypes.func.isRequired
};
