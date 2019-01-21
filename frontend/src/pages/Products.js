import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Events.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    products: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.categoryElRef = React.createRef();
    this.genderElRef = React.createRef();
    this.manufacturerElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchProducts();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const name = this.nameElRef.current.value;
    const price = +this.priceElRef.current.value;
    const category = this.categoryElRef.current.value;
    const manufacturer = this.manufacturerElRef.current.value;
    const gender = this.genderElRef.current.value;

    if (
      name.trim().length === 0 ||
      price <= 0 ||
      category.length === 0 ||
      manufacturer.length === 0 ||
      gender.length === 0
    ) {
      return;
    }

    const product = { name, price, manufacturer, gender, category };
    console.log(product);

    const requestBody = {
      query: `
          mutation {
            createProduct(productInput: {name: "${name}", manufacturer: "${manufacturer}", price: ${price}, gender: "${gender}", category: "${category}"}) {
              _id
              name
              manufacturer
              gender
              category
              price
              creator{
                _id
                email
              }
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.fetchProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  fetchProducts() {
    const requestBody = {
      query: `
          query {
            products {
              _id
              name
              category
              manufacturer
              gender
              price
              creator{
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const products = resData.data.products;
        console.log(products);
        this.setState({ products: products });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const productList = this.state.products.map(product => {
      return (
        <li key={product._id} className="events__list-item">
          {product.name} {product.creator.email} 
        </li>
      );
    });

    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Nuevo Artículo"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Nombre</label>
                <input type="text" id="name" ref={this.nameElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Precio</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Categoría</label>
                <input type="text" id="category" ref={this.categoryElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Fabricante</label>
                <input type="text" id="manufacturer" ref={this.manufacturerElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Genero</label>
                <input type="text" id="gender" ref={this.genderElRef} />
              </div>

            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Share your own Events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        <ul className="events__list">{productList}</ul>
      </React.Fragment>
    );
  }
}

export default ProductsPage;
