import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Form } from 'react-bootstrap/';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      userData: [],
      show: false,
      email: '',
      showUpdate: false,
      index: 0,
      NameBook:'',
      bookDis:'',
      bookSta:'',
    }
  }
  componentDidMount = async () => {
    const heroku = process.env.REACT_APP_SERVER;
    const { user } = this.props.auth0;
    const bookURL = `${heroku}/Book?email=${user.email}`;
    const userURL = `${heroku}/User`;
    let bookRes = await axios.get(bookURL);
    let userRes = await axios.get(userURL);

    this.setState({
      bookData: bookRes.data,
      userData: bookRes.data,
      email: user.email,
    });
    //console.log(this.state.email);

  }
  handelClick = () => {
    this.setState({
      show: true,
    });
  };
   handelUpdateClick = (inx)=> {
  this.setState({
    showUpdate: true,
    index: inx,
    NameBook: this.state.userData[inx].name,
    bookDis: this.state.userData[inx].description,
    bookSta: this.state.userData[inx].status,

  });
  console.log(this.state.NameBook);
  console.log(this.state.bookDis);
  console.log(this.state.index);
}

handleClose = () => {
  this.setState({
    show: false,
  })
}
handleUpdateClose = () => {
  this.setState({
    showUpdate: false,

  })
}

addBook = async (event) => {
  event.preventDefault();
  //console.log(event.target.bookName.value);
  const server = process.env.REACT_APP_SERVER;
  const newBook = {
    name: event.target.bookName.value,
    description: event.target.description.value,
    status: event.target.status.value,
    userEmail: this.state.email,

  }
  const addBookUrl = await axios.post(`${server}/addBook`, newBook);
  this.setState({
    userData: addBookUrl.data,
  })
}

deleteBook = async (idx) => {
  const server = process.env.REACT_APP_SERVER;
  const deletPara = {
    email: this.state.email,
    index: idx,
  }
  const deletURL = await axios.delete(`${server}/deleteBook`, { params: deletPara });
  this.setState({
    userData: deletURL.data,
  });
}

UpdateBook = async (event) => {
  event.preventDefault();
  const server = process.env.REACT_APP_SERVER;
  const updatePara = {
    email: this.state.email,
    index: this.state.index,
    name: event.target.NameBook.value,
    description: event.target.bookDis.value,
    status: event.target.bookSta.value,
  }
  let updateURL = await axios.put(`${server}/updateBook/${this.state.index}`, updatePara);
  this.setState({
    userData: updateURL.data,
  });

}
render() {

  return (

    <div className='container h-85'>
      <div className='row w-100'>
        <div className='col m-auto d-flex justify-content-center'>
          <Button variant="warning" onClick={this.handelClick} >Add Book</Button>
        </div>

      </div>
      {console.log(this.state.bookData.length)}
      {

        this.state.bookData.length > 0 &&
        <div className="row row-cols-3">
          {this.state.userData.map((ele, inx) => {
            return (

              <Card key={inx.toString()} className='rawan'>


                <Card.Body>
                  <Card.Title>Book Name: {ele.name}</Card.Title>
                  <Card.Text>
                    description : {ele.description}
                  </Card.Text>
                  <div className='btn-rawan'>
                    <Button variant="warning" onClick={() => this.deleteBook(inx)}>Delete</Button>
                    <Button variant="warning" onClick={() => this.handelUpdateClick(inx)}>Update</Button>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">status: {ele.status}</small>
                </Card.Footer>
               
  


              </Card>
            )
          })
          }
        </div>

      }

      {/*================== add book form modal ====================== */}
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addBook}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Book name</Form.Label>
              <Form.Control type="text" placeholder="book name" name='bookName'  />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Book description</Form.Label>
              <Form.Control type="text" placeholder="description" name='description' />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Book status</Form.Label>
              <Form.Control type="text" placeholder="status" name='status' />
            </Form.Group>
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      {/*================== update book form modal ====================== */}
      <Modal show={this.state.showUpdate} onHide={this.handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.UpdateBook}>
            <Form.Group controlId="formBasicEmail2">
              <Form.Label>Book name</Form.Label>
              <Form.Control type="text" placeholder="book name" name='NameBook'defaultValue={this.state.NameBook}/>

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Book description</Form.Label>
              <Form.Control type="text" placeholder="description" name='bookDis'value={this.state.bookDis} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Book status</Form.Label>
              <Form.Control type="text" placeholder="status" name='bookSta' value={this.state.bookSta}/>
            </Form.Group>
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleUpdateClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}
}

export default withAuth0(MyFavoriteBooks);
