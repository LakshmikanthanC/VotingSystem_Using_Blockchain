import React, { useState } from 'react';
import Login from './Login';
import Voting from './components/Voting/Voting';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Voting />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
