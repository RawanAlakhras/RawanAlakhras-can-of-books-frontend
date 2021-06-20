import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {Button} from 'react-bootstrap/';
function LoginButton() {
  const {isAuthenticated,loginWithRedirect,} = useAuth0();
//   const isAuthenticated = useAuth0().isAuthenticated;
//   const loginWithRedirect = useAuth0().loginWithRedirect;

  return !isAuthenticated && (
    <Button onClick={loginWithRedirect} variant="warning">Log in</Button>
  );
}

export default LoginButton;