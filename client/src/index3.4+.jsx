import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);


/*
3.3
UPDATING YOUR CORS POLICY
If you only allowed certain domains in your CORS policy, you’ll need to update your policy to authorize your frontend domain to make requests. At the end of this Achievement, you'll host your frontend on Heroku, so we only need to take the following steps:
Update your “index.js” file either by adding "http://localhost:1234" to the list of allowed domains or using the asterix (*) to allow all domains.

Add your changes by typing git add index.js in your terminal.
Commit your changes by typing git commit -m "enable cors for local react app/all domains" in your terminal.
Push your changes to Heroku by typing git push heroku master in your terminal.
*/


//3.3 where is index.js???

// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return <MainView />;
    }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);



//3.5 Not sure where this goes: (index.js of your API)
// passport.authenticate('jwt', { session: false })

//3.6
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return(
    <Provider store={store}>
        <MainView />
    </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
