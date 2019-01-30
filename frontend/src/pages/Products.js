import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
// const SweetAlert = require('react-bootstrap-sweetalert');
const SuccessIndicator = require('react-success-indicator');
//import './Events.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    products: [],
    isLoading: false,
    isSuccess: false,
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
      })
      .catch(err => {
        console.log(err);
      });
    this.cleanForm();
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  cleanForm = () => {
    this.nameElRef.current.value = "";
    this.priceElRef.current.value = "";
    this.categoryElRef.current.value = "";
    this.manufacturerElRef.current.value = "";
    this.genderElRef.current.value = "";
    this.setState({ isSuccess: true });

  }

  successHandler = () => {
    this.setState({ isSuccess: false });
  }

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
        <div className="container-fluid">
          {/* {this.context.token && (
            <div className="col-md-9 pt-4 pb-4 pl-0 mx-auto">

            </div>
          )} */}
          <div className="row">
            <div className="col-md-3 pt-4">
              {!this.state.isSuccess ? (
                <div class="card w-100">
                  <div class="card-header text-center">
                    Ingresar Nuevo Articulo
                    </div>
                  <div class="card-body p-1 pt-3">
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
                      <div className="form-group col-md-12 text-right pt-4">
                        <button type="button" className="btn btn-success" onClick={this.modalConfirmHandler}>+ Agregar Producto</button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div class="card w-100 text-center pt-5">
                  <div className="pt-5">
                    <div className="form-group col-md-12">
                      <p>
                        <SuccessIndicator size='96px' color='green' />
                      </p>
                      <p>
                        Articulo agregado!
                    </p>
                      <button type="button" className="btn btn-success" onClick={this.successHandler}>OK!</button>
                    </div>
                  </div>
                  </div>
                )}
            </div>
            <div className="col-md-9">
              <div className="pt-4 pb-4 pl-0 mx-auto">
                <div className="input-group input-group-lg col-md-10">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Buscar</span>
                  </div>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
              </div>
              {this.state.isLoading ? (
                <div className="pt-5">
                <Spinner />
                </div>
              ) : (
                  <ProductList products={this.state.products} />
                )}

            </div>

          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default ProductsPage;
