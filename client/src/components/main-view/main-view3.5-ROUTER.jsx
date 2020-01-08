// main-view.jsx
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  //3.5 does order matter?
  getMovies(token) {
/*...*/
  }

  //3.5 Not sure if this still applies to ROUTER version
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('movies'); //optional?
    this.setState({
      user: null
    })
    window.open('/', '_self');
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

/* 3.5
Similarly, you can use axios to make a GET request to the "/users/:Username" endpoint in order to get profile information for a specific user; a PUT request to the |/users/:Username| endpoint to update a user’s profile information; and a DELETE request to the |/users/:Username| endpoint to deregister the user. You'll be asked to do so later in this Exercise, so make sure to display the correct username somewhere in your main view (which will take you to the profile page); add the new routes; create the respective views (one for viewing profile data and another one for editing); and make axios requests to get/update the profile data or deregister the user.

As mentioned earlier, it’s possible to get director and genre information straight from a movie. This means you don’t need to make any extra requests to get the details of a movie, its director, or its genre.
*/

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Route exact path="/" render={() => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
          }
          }/>
        <Route path="/register" render={() => <RegistrationView />} />
        <div className="main-view">
          <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        </div>
        <Route path="/directors/:name" render={({ match }) => {
          if (!movies) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
        } />
        //modified from above to route for genres. Not sure if this will work.
        <Route path="/genres/:name" render={({ match }) => {
          if (!movies) return <div className="main-view"/>;
          return <GenresView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
        } />
      </Router>
    );
  }
}
