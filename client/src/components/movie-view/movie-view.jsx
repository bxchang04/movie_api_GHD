import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';

export function MovieView(props) {

  const { movie } = props;
  if (!movie) return null;

  function handleSubmit(event) {

    //Send error on backend if movie is already in favorites list -- something's not sure for this conditional so I commented it out
/*
    if((localStorage.getItem('movies')).find(movie => movie._id === favoriteMovie)){
      alert('Movie has already been added to Favorites List!');
    } else {
    */

    event.preventDefault();
    axios.post(`https://myFlixDB2.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      Username: localStorage.getItem('user')
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorites List!');
      })
      .catch(event => {
        console.log('error adding movie to list');
        alert('Ooooops... Something went wrong!');
      });
    /*}*/
  };

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
        {/* favorited.filter(movie._id) === this.movie._id*/}
        {/* or */}
        {/* favorited.find(m => m._id === this.movie_id)*/}
        {/*? "" : */}
        <Button variant="outline-secondary" onClick={event => handleSubmit(event)}> Add to Favourites </Button>
        {/*}*/}

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
