import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor(props) { //https://www.youtube.com/watch?v=H_Kz_c2Bkzg - why add props as param?
    super(props); //same ? as above

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
        <div>
          <button onClick={this.props.history.goBack}>Back</button>
        </div>
      </div>



    );

  }
}
