//import React, { useState } from 'react'; //is this needed?
import axios from 'axios';

const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('YOUR_API_URL/login', {
        Username: username,
        Password: password
    })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
};

//does this need to be nested into the above?
onLoggedIn(authData) {
    console.log(authData);
    this.setState({
        user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
}

//older code -- is this needed?
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

//redundant?
// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(username, password);
//     // Send a request to the server for authentication then call props.onLoggedIn(username)
//     props.onLoggedIn(username);
// };