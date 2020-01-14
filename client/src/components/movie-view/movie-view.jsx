import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        <br />
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Link to={`/`}>
            <Button variant="link" className="sign-up-link btn-lg" type="submit">Back</Button>
          </Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <h1>{movie.Title}</h1>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to={`/`}>
            <Button variant="link" className="sign-up-link btn-lg" type="submit">Add to favorites</Button>
          </Link>

        </Media>
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body>
            <br />
              {/*add All movies button*/}
            <h6>Genre:
              <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </h6>
            <h6>Director:
              <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </h6>
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
