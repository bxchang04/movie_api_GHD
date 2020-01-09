import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div
          className="movie-go-back"
          onClick={() => onClick()}> {/*What is the relationship of this and main-view? Not clear.*/}
          <button>
            Back to list of movies
          </button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <button>
            Add to favorites {/*placeholder. no functionality yet.*/}
          </button>
          {/*No longer works now with bootstrap in main-view.*/}
        </div>
      </div>



    );

  }
}
