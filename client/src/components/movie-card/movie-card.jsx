import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

const MAX_CHARS_IN_A_DESCRIPTION = 100;

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    let movieDescription = movie.Description;
    if (movieDescription.length > MAX_CHARS_IN_A_DESCRIPTION) {
      movieDescription = `${movieDescription.substring(0, MAX_CHARS_IN_A_DESCRIPTION)}...`;
    }

    return (
      <Card className="mb-3 mb-sm-4" style={{ width: '14rem' }} >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.Genre.Name}</Card.Subtitle>
          <Card.Text>{movieDescription}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="outline-primary" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}


/*
    return (
      <Card className="mb-3 mb-sm-4" style={{ minWidth: '12rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>
            {movie.Title}
            {user &&
              <StarButton
                movieId={movie._id}
                isFavorite={isFavorite}
                onToggleFavourite={movieId => onToggleFavourite(movieId)}
                className="ml-2" />
            }
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.Genre.Name}</Card.Subtitle>
          <Card.Text>{movieDescription}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="outline-primary" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
*/

//is this still required?
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description : PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio : PropTypes.string,
    }),
    ImagePath : PropTypes.string,
    Featured : PropTypes.boolean
  }).isRequired,
  // onClick: PropTypes.func.isRequired //not sure why this causes an error
};
