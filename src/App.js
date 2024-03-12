import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const handleAuth = async () => {
      // Make a POST request to your server to exchange the code for an access token
      const response = await fetch(`http://localhost:4000/api/github/callback?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Redirect or handle successful login
        console.log('Login successful');
        const data = await response.json();
        if (data.accessToken) {
          const auth_result = await fetch(`https://api.github.com/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'token ' + data.accessToken
            }
          });
          const result = await auth_result.json();
          setUser(result);
        }
      } else {
        // Handle login error
        console.error('Login failed');
      }
    };
    if (code) {
      handleAuth();
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? <p style={{color: 'red'}}>
          {`Hello ${user.login}`}
        </p> :
          <p>
            Login with GitHub
          </p>}
        <Login />
      </header>
    </div>
  );
}

export default App;
