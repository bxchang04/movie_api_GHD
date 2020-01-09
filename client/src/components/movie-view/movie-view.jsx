import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body>
            <div
              className="movieButtons"
              onClick={() => onClick()}> {/*What is the relationship of this and main-view? Not clear.*/}
              <button>
                Back to list of movies
                {/*No longer worked now in main-view, so added a onButtonClick prop*/}
              </button>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <button>
                Add to favorites {/*placeholder. no functiona.*/}
              </button>
            </div>
            <h1>{movie.Title}</h1>
            <br />
            <h6>Genre: {movie.Genre.Name}</h6>
            <h6>Director: {movie.Director.Name}</h6>
            <br />
            <h6>Description</h6>
            <p>
              {movie.Description}
            </p>
          </Media.Body>
          <img
            width={220}
            height={326}
            className="ml-3"
            src={movie.ImageUrl}
            alt="Generic placeholder"
          />
        </Media>
      </div>
    );
  }
}
