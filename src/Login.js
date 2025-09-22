import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'password123') {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting System Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
