import React from 'react';

/* redundant code from earlier example?
export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is `MainView`, as `MainView` is what’s
        // connected to your database via the movies endpoint of your API
        const { movie } = this.props;

        return (
            <div className="movie-card">{movie.Title}</div>
        );
    }
}
*/

import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

/*

3.3

Make sure to assign a valid path to each movie's ImagePath in the database. One option is to use the image's URL from the web. To do so in Chrome, right-click on the image you want to use, then select “Copy Image Address” and paste it into the corresponding ImagePath in the database. Just make sure you have permission to use the image!
 --> where should I update this "database"?

 sample image for Pokemon the Movie link:
https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi_0Ienv4nmAhWOct8KHQ_xA3oQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0190641%2F&psig=AOvVaw2p0Un5xfl5SaSdoPF-Bytn&ust=1574913278114790

*/

//3.5
/*
// movie-view.jsx
// is the order correct for these links?
<Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">Director</Button>
</Link>
<Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">Genre</Button>
</Link>

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}


*/