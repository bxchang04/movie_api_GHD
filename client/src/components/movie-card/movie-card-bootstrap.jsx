// client/src/components/movie-card/movie-card.jsx

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

/*

3.3

Make sure to assign a valid path to each movie's ImagePath in the database. One option is to use the image's URL from the web. To do so in Chrome, right-click on the image you want to use, then select “Copy Image Address” and paste it into the corresponding ImagePath in the database. Just make sure you have permission to use the image!
 --> where should I update this "database"?

 sample image for Pokemon the Movie link:
https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi_0Ienv4nmAhWOct8KHQ_xA3oQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0190641%2F&psig=AOvVaw2p0Un5xfl5SaSdoPF-Bytn&ust=1574913278114790

*/