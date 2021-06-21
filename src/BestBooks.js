import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import './BestBooks.css';
import axios from 'axios';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      userData: [],
    }
  }
  componentDidMount = async () => {
    const heroku = process.env.REACT_APP_SERVER;
    const bookURL = `${heroku}/Book`;
    const userURL = `${heroku}/User`;

    let bookRes = await axios.get(bookURL);
    let userRes = await axios.get(userURL);

    this.setState({
      bookData: bookRes.data,
      userData: userRes.data,
    });
  }
  render() {

    return (

      <div className='container h-85'>
        {console.log(this.state.bookData.length)}
        {

          this.state.bookData.length > 0 &&
          <Carousel className="w-100 h-100">
            {this.state.bookData.map((ele, inx) => {
              return (
                <Carousel.Item key={inx.toString()}>
                  <img
                    className="w-100"
                    src="https://via.placeholder.com/190"
                    alt="First slide"
                  />
                  {console.log(ele.name)}
                  <Carousel.Caption>
                    <h3>name of the book : {ele.name}</h3>
                    <p>description : {ele.description}</p>
                    <p>status: {ele.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })
            }
          </Carousel>

        }

      </div>
    )
  }
}

export default MyFavoriteBooks;
