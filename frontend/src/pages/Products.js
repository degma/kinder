import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
import Select from 'react-select';
import SearchBox from '../components/SearchBox/SearchBox';
// const SweetAlert = require('react-bootstrap-sweetalert');
const SuccessIndicator = require('react-success-indicator');
//import './Events.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    products: [],
    categories: [],
    manufacturers: [],
    isLoading: false,
    isSuccess: false,
    searchField: '',
    selectedEvent: null,
    selectedCategory: null
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
    this.fetchCategs();
    this.fetchProducts();
    this.fetchManu();
    this.fetchGenders();
    console.log("Categorias" + this.fetchCategs());
    console.log("Genders" + this.fetchGenders());

  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {

    const name = this.nameElRef.current.value;
    const price = +this.priceElRef.current.value;
    const category = this.state.selectedCategory;
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

    this.manufacturerElRef.current.value = "";
    this.genderElRef.current.value = "";
    this.setState({ isSuccess: true });

  }

  successHandler = () => {
    this.setState({ isSuccess: false });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });

    // console.log(filteredProds);
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

  fetchCategs() {
    const requestBody = {
      query: `
          query {
            categories {
              _id
              name
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
        const cates = resData.data.categories;

        if (this.isActive) {
          this.setState({ categories: cates });
          console.log(this.state.categories);
          console.log("productos" + this.state.products);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchManu() {
    const requestBody = {
      query: `
          query {
            manufacturers {
              _id
              name
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
        const manus = resData.data.categories;

        if (this.isActive) {
          this.setState({ manufacturers: manus });
          console.log(this.state.manus);

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchGenders() {
    const requestBody = {
      query: `
          query {
            genders {
              _id
              name
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
        const genders = resData.data.categories;

        if (this.isActive) {
          this.setState({ genders: genders });
          console.log(this.state.manus);

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  changeSelect = selectedCategory => {
    if (selectedCategory !== null) {
      this.setState({ selectedCategory: selectedCategory.name });
    } else {
      this.setState({ selectedCategory: '' });
    }

    console.log("selected Cat: " + this.state.selectedCategory);
  }

  render() {
    const filteredProds = this.state.products.filter(product => {
      return product.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      // return Object.keys(product).some(key => product[key].toString().search(this.state.searchField.toLowerCase()) !== -1);
    })
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
                <div className="card w-100">
                  <div className="card-header text-center">
                    Ingresar Nuevo Articulo
                    </div>
                  <div className="card-body p-1 pt-3">
                    <form>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Nombre</label>
                        <input type="text" id="name" ref={this.nameElRef} className="form-control" placeholder="Nombre del producto" />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Precio</label>
                        <input type="number" id="price" ref={this.priceElRef} className="form-control" placeholder="Precio" />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputCity">Fabricante</label>
                        <Select
                          options={this.state.categories}
                          onChange={this.changeSelect}
                          id="category"
                          isSearchable={true}
                          isClearable={true}
                          className="basic-single"
                          getOptionLabel={opt => opt.name}
                          getOptionValue={opt => opt._id}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputCity">Genero</label>
                        <Select
                          options={this.state.categories}
                          onChange={this.changeSelect}
                          id="category"
                          isSearchable={true}
                          isClearable={true}
                          className="basic-single"
                          getOptionLabel={opt => opt.name}
                          getOptionValue={opt => opt._id}
                        />
                      </div>


                      <div className="form-group col-md-12">
                        <label htmlFor="inputState">Categoría</label>
                        <Select
                          options={this.state.categories}
                          onChange={this.changeSelect}
                          id="category"
                          isSearchable={true}
                          isClearable={true}
                          className="basic-single"
                          getOptionLabel={opt => opt.name}
                          getOptionValue={opt => opt._id}
                        />
                      </div>
                      <div className="form-group col-md-12 text-right pt-4">
                        <button type="button" className="btn btn-success" onClick={this.modalConfirmHandler}>+ Agregar Producto</button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                  <div className="card w-100 text-center pt-5">
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

              <SearchBox searchChange={this.onSearchChange} />

              {this.state.isLoading ? (
                <div className="pt-5">
                  <Spinner />
                </div>
              ) : (
                  <ProductList products={filteredProds} />
                )}

            </div>

          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default ProductsPage;
