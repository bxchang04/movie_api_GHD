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
    //props underneath don't need to be declared in constructor, unlike states.
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <br />
        <Media className="d-flex flex-column flex-md-row align-items-center">
        <div
          className="movie-go-back"
          onClick={() => onClick()}> {/*What is the relationship of this and main-view? Not clear.*/}
          <button>
          Back
          {/*No longer worked now in main-view, so added a onButtonClick prop to main-view*/}
          </button>
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <h1>{movie.Title}</h1>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div
          className="movie-go-back"
          onClick={() => onClick()}> {/*What is the relationship of this and main-view? Not clear.*/}
          <button>
          Add to favorites {/*placeholder. no function, just goes back for now.*/}
          </button>
        </div>
        </Media>
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body>
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
            src={movie.ImagePath}
            alt="Generic placeholder"
          />
        </Media>
      </div>
    );
  }
}

//add movie-view.propTypes?
