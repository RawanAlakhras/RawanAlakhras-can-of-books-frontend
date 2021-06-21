import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap/';
import './Header.css';
import LogoutButton from './LogoutButton'
import { withAuth0 } from '@auth0/auth0-react'; 
import LoginButton from './loginButton';
class Header extends React.Component {


  render() {
    const { isAuthenticated } = this.props.auth0; 
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
       <div className='container'>
       <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Nav className="m-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">profile</Nav.Link>
        </Nav>
        {/*  <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link> */}
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        {
          isAuthenticated ?<LogoutButton />:<LoginButton />
        }
        
        
       </div>

      </Navbar>
    );
  }
}

export default withAuth0(Header);

