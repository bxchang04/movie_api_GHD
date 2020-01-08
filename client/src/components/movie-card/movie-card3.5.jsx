import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

//taken from models.js in project project's root folder
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
    Actors : PropTypes.string,
    ImagePath : PropTypes.string,
    Featured : PropTypes.boolean
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
