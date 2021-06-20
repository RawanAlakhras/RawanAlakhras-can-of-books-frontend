import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  render() {
    return(
     <div className='container h-85'>
        <Jumbotron>
        <h1 className='text-warning text-center'>My Favorite Books</h1>
        <p className='text-center'>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
     </div>
    )
  }
}

export default MyFavoriteBooks;
