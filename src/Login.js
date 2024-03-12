import React, { useState } from 'react';

const GitHubLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    const redirectUri = encodeURIComponent(`${window.location.origin}`);

    // Replace CLIENT_ID with your GitHub OAuth App's Client ID
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=Iv1.5c8dcff3d8b225ab&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubLoginUrl;
  };

  return (
    <div>
      {isLoggingIn ? (
        <p>Redirecting to GitHub...</p>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
    </div>
  );
};

export default GitHubLogin;