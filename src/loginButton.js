import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {isAuthenticated,loginWithRedirect,} = useAuth0();
//   const isAuthenticated = useAuth0().isAuthenticated;
//   const loginWithRedirect = useAuth0().loginWithRedirect;

  return !isAuthenticated && (
    <button onClick={loginWithRedirect}>Log in</button>
  );
}

export default LoginButton;