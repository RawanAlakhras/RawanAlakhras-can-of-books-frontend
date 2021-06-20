import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import './profile.css';
class Profile extends Component {
  render() {
    const { user,isAuthenticated } = this.props.auth0;
    return (
        <>
       <div className='container profile'>
       {isAuthenticated && <img src={user.picture} alt='profile'/>}
        {isAuthenticated && <h1 className='text-warning'>Hello {user.name}</h1>}
        {isAuthenticated && <h4>Email: {user.email}</h4>}
        {console.log(user)}
       </div>
        </>
    )
    ;
  }
}

export default withAuth0(Profile);
