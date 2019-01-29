import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
//import './Events.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    products: [],
    isLoading: false,
    selectedEvent: null
  };

  isActive = true;

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
        this.setState(prevState => {
          const updatedProducts = [...prevState.products];
          updatedProducts.push({
            _id: resData.data.createProduct._id,
            name: resData.data.createProduct.name,
            category: resData.data.createProduct.category,
            manufacturer: resData.data.createProduct.manufacturer,
            gender: resData.data.createProduct.gender,
            price: resData.data.createProduct.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { products: updatedProducts };
        });
        // this.fetchProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchProducts() {
    this.setState({ isLoading: true });
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
        if (this.isActive) {
          this.setState({ products: products, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }
  componentWillUnmount() {
    this.isActive = false;
  }
  render() {
    return (
      <React.Fragment>
        {/* <div className="container-fluid"> */}

          {(this.state.creating ) && <Backdrop />}
          {this.state.creating && (
            <Modal
              title="Add Event"
              canCancel
              canConfirm
              onCancel={this.modalCancelHandler}
              onConfirm={this.modalConfirmHandler}
              confirmText="Confirm"
            >
              <form>
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4">Nombre</label>
                  <input type="text" id="name" ref={this.nameElRef} className="form-control" placeholder="Nombre del producto" />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputCity">Fabricante</label>
                  <input type="text" id="manufacturer" ref={this.manufacturerElRef} className="form-control" placeholder="Fabricante" />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4">Precio</label>
                  <input type="number" id="price" ref={this.priceElRef} className="form-control" placeholder="Precio" />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputCity">Genero</label>
                  <input type="text" id="gender" ref={this.genderElRef} className="form-control" placeholder="Genero" />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputState">Categoría</label>
                  <input type="text" id="category" ref={this.categoryElRef} className="form-control" placeholder="Categoría" />
                </div>
              </form>
            </Modal>
          )}
          
            
        {this.context.token && (       
              <div className="col-lg-4 pt-4 pb-4 pl-0 mx-auto">
                <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Buscar</span>
                  </div>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="col-lg-4 pt-4 pb-4 pl-0 mx-auto">
                  <button type="button" className="btn btn-success" onClick={this.startCreateEventHandler}>+ Agregar Producto</button>
                </div>
              </div>
            
        )}

          {this.state.isLoading ? (
            <Spinner />
          ) : (
              <ProductList products={this.state.products} />
            )}

        {/* </div> */}

      </React.Fragment>
    );
  }
}

export default ProductsPage;
