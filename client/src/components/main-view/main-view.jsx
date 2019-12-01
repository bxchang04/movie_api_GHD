class MainView extends React.Component {
    constructor() {
        // Call the superclass constructor
        // so React can initialize it
        super();

        // Initialize the state to an empty object so we can destructure it later
        this.state = {};
    }

    // This overrides the render() method of the superclass
    // No need to call super() though, as it does nothing by default
    render() {
        return (
            <div className="main-view"></div>
        );
    }
}

//3.3 update
// One of the "hooks" available in a React Component
componentDidMount() {
    axios.get('<my-api-endpoint/movies>')
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
        <div className="main-view">
            {movies.map(movie => (
                <div className="movie-card" key={movie._id}>{movie.Title}</div>
            ))}
        </div>
    );
}

import { MovieCard } from '../movie-card/movie-card';

import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}

//3.4
// client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    //3.4
    // componentDidMount() {
    //     /* ... */
    // }

    //3.5
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}

//for 3.5. Is the ordering right?
getMovies(token) {
    axios.get('YOUR_API_URL/movies', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

//3.5
/*
Perhaps you’re wondering how you can log out as a user. To do so, you can add a new button in your application’s MainView and add an onClick handler, where you delete the token and the user from localStorage—as simple as that!

To delete the token and the user from localStorage, you need to use the following commands:

localStorage.removeItem('token');

localStorage.removeItem('user');

You’ve seen how to access the localStorage in your browser using code, but it’s also useful to know how to access the localStorage and delete any key you want manually. Open your browser and navigate to your application. Right-click on the page and open the console, switch to the “Application” tab, expand local storage on the left, and click on the address under which your application is running ("http://localhost:1234"). To the right-hand side of the page, you’ll see the user and token keys saved in the localStorage. Select the keys one-by-one and click on the delete icon. Now, if you refresh or restart your browser, you will be logged out!

To clear your localStorage even faster, open the console with your website open and type: localStorage.clear(). This command will clear both the token and the user! To check that your localStorage is empty, switch to the “Application” tab and see if the keys have been deleted.

*/


//3.5 state-based router
// main-view.jsx
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            user: null
        };
    }

    getMovies() {
        /* ... */
    }


    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
    ...
    }

    render() {
        const { movies, user } = this.state;


        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={/* welcome */} />
                    <Route exact path="/movies/:movieId" render={/* movie view */} />
                    <Route exact path="/genres/:name" render={/* genre view*/} />
                    <Route exact path="/directors/:name" render={/* director view */} />
                </div>
            </Router>

            //3.5 delete above?
            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

            <Route path="/directors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }
            } />
        );
    }
}

//3.6
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// #0
import { setMovies } from '../../actions/actions';

     // we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    };
  }

componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
}

 getMovies(token) {
    axios.get('YOUR_API_URL/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // #1
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {

    // #2
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router basename="/client"> //3.6 added basename="/client"
         <div className="main-view">
           <Route exact path="/" render={() => {
             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
             return <MoviesList movies={movies}/>;
         }} />
           <Route path="/register" render={() => <RegistrationView />} />
           <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
         </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies } )(MainView);
