//Need to make this into grid

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
      <Card className="ml-2 ml-sm-2 mr-2 mr-sm-2 mb-3 mb-sm-4" style={{ width: '14rem' }} > {/*added mr*/}
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};
