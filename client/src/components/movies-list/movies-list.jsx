import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { MovieCard } from '../movie-card/Movie-Card';
import Container from 'react-bootstrap/Container';

const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;

    let moviesToShow = movies.concat().sort((a,b) => {
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    if (visibilityFilter !== '') {
        moviesToShow = moviesToShow.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }
    return { movies: moviesToShow };
};

function MoviesList(props){
    const { movies } = props;

    if (!movies) return <div className='main-view' />

    //button to logout and clear token/username
    function buttonLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
        // window.location.reload();
    }
    return (

        <Container>
        <div className='userInfo'>
            <VisibilityFilterInput />
                </div>
            <Row>
                {movies.map(m => (
                    <Col key={m._id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard key={m._id} movie={m} />
                    </Col>
                ))
                }
            </Row>
        </Container>

    )
}

export default connect(mapStateToProps)(MoviesList);
