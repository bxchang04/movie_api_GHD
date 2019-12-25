import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    /* ... */
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
      {selectedMovie
         ? <MovieView movie={selectedMovie}/>
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
         ))
      }
      //back button from https://jsfiddle.net/2fmbfn41/2/
      {this.state.showBack?
        <a onClick={()=>hashHistory.goBack()}>&#8592; </a>
        :<a className="back-btn">&#9776;</a>
       }
     </div>

    );
  }
}

//back button from https://jsfiddle.net/2fmbfn41/2/
ReactDOM.render(
  <Router history={hashHistory}>
       <Route path="/" component={App} >
            <Route path="page1" component={Page1}/>
            <Route  path="page2" component={Page2}/>
            <Route  path="page3" component={Page3}/>
       </Route>
</Router>, document.querySelector('#app'));
