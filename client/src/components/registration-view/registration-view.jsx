// registration-view.jsx

/* 3.5
Take the example of registering a new user. The idea is simple: when clicking on your form's "register" button (on your RegistrationView), all you need to do is create a new handleRegister method where you make a POST request to the “/users” endpoint with axios, just as you used it to make a POST request to the “/login” endpoint. You can open your console and log the data entered and the response from your API. If you don’t remember how to add a click handler to your registration form, you can refer to your login form for a reminder:
*/

//Begin copy from login-view
import React, { useState } from 'react';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
    };

    return (
        <form>
            <label>
                Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
};
//End copy from login-view

axios.post('YOUR_API_URL/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
})
    .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/client', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab //3.6 replaced / with /client
    })
    .catch(e => {
        console.log('error registering the user')
    });

constructor() {
    super();

    this.state = {
        movies: [],
        user: null
    };
}

<Route exact path="/" render={() => {
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    return movies.map(m => <MovieCard key={m._id} movie={m} />)
}
} />
    <Route path="/register" render={() => <RegistrationView />} />
{/* you keep the rest routes here */ }

/* 3.5
Similarly, you can use axios to make a GET request to the "/users/:Username" endpoint in order to get profile information for a specific user; a PUT request to the |/users/:Username| endpoint to update a user’s profile information; and a DELETE request to the |/users/:Username| endpoint to deregister the user. You'll be asked to do so later in this Exercise, so make sure to display the correct username somewhere in your main view (which will take you to the profile page); add the new routes; create the respective views (one for viewing profile data and another one for editing); and make axios requests to get/update the profile data or deregister the user.
*/
