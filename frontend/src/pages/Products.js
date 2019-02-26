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
    currentpricelistname: null,
    currentpricelistid: null,
    products: [],
    categories: [],
    manufacturers: [],
    genders: [],
    isLoading: false,
    isSuccess: false,
    searchField: '',
    selectedCategory: [],
    selectedGender: [],
    selectedManufacturer: null,
    selectedPriceList: null,
    selectedOption: []
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.categoryElRef = React.createRef();
    this.genderElRef = React.createRef();
    this.manufacturerElRef = React.createRef();
    this.pricelistElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchCategs();
    this.fetchProducts();
    console.log("Productos!" + this.fetchProducts());
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
    const description = this.descriptionElRef.current.value;
    const price = +this.priceElRef.current.value;
    const category = this.state.selectedCategory.map(cat =>  '"' + cat._id + '"');
    const manufacturer = this.state.selectedManufacturer._id;
    const gender = this.state.selectedGender.map(gen=> '"' + gen._id + '"');

    // if (
    //   name.trim().length === 0 ||
    //   price <= 0 ||
    //   category.length === 0 ||
    //   manufacturer.length === 0 ||
    //   gender.length === 0
    // ) {
    //   return;
    // }

    const product = { name, description, price, manufacturer, gender, category };
    console.log(product);

    const requestBody = {
      query: `
          mutation {
            createProduct( productInput: {
              name: "${name}",
              description: "${description}" ,
              categoryId: [${category}],
              manufacturerId: "${manufacturer}", 
              genderId: [${gender}], 
              pricelistId: "${this.state.currentpricelistid}",
              price: ${price}, 
                } ) {
                  _id
                  name
                  description
                  categoryId{
                    name
                  }
                  manufacturerId{
                    name
                  }
                  genderId{
                    name
                  }
                  productprice{
                    _id
                    productId{
                      name                      
                    }
                    pricelistId{
                      name
                    }
                    price
                  }
                  
                }
              }
        `
    };
    console.log(requestBody);
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
          console.log(updatedProducts);
          console.log(resData.data);
          // console.log("Updted PRODUCTS --->" + updatedProducts);
          // console.log("PUSH PROD" + resData.data.createProduct);
          updatedProducts.push({
            productId: {
              _id: resData.data.createProduct._id,
              name: resData.data.createProduct.name,
              description: resData.data.createProduct.description,
              categoryId:[{
                name: resData.data.createProduct.categoryId.name,
              }],
              manufacturerId: {
                name: resData.data.createProduct.manufacturerId.name,
              },
              genderId: [{
                name: resData.data.createProduct.genderId.name,
              }]

            },
            price: resData.data.createProduct.price,
            
          });
          console.log("Updted PRODUCTS --->" + updatedProducts);
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
  }

  fetchProducts() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          currentPriceList{
            _id
            name
            prodprices{
              productId{
                _id
                name
                description
                categoryId{
                  name
                }
                manufacturerId{
                  name
                }
                genderId{
                  name
                }
              }
              price
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
        const products = resData.data.currentPriceList.prodprices;
        console.log("ESTOS SON LOS PRODUCTOSSSSSSSSSSSSSSSSSSSSSS" + products )
        const pricelistid = resData.data.currentPriceList._id;
        const pricelistName = resData.data.currentPriceList.name;

        if (this.isActive) {
          this.setState({ products: products, currentpricelistid: pricelistid, currentpricelistname: pricelistName, isLoading: false });
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
        const manus = resData.data.manufacturers;

        if (this.isActive) {
          this.setState({ manufacturers: manus });
          console.log(this.state.manufacturers);

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
        const genders = resData.data.genders;

        if (this.isActive) {
          this.setState({ genders: genders });
          console.log(this.state.genders);

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  changeSelectManu = selectedOption => {
    if (selectedOption !== null) {
      this.setState({ selectedManufacturer: selectedOption });
      console.log(this.state.selectedManufacturer);
    } else {
      this.setState({ selectedManufacturer: '' });
    }
  }

  changeSelectCate = selectedOption => {
    if (selectedOption !== null) {
      // var selcats = this.state.selectedCategory;
      // selcats.push(selectedOption);
      this.setState({selectedCategory: selectedOption});
      console.log(this.state.selectedCategory);
    } else {
      this.setState({ selectedCategory: '' });
    }
  }
  
    changeSelectGender = selectedOption => {
      if (selectedOption !== null) {
        // var selgends = this.state.selectedGender;
        // selgends.push(selectedOption);
        this.setState({selectedGender: selectedOption});
        console.log(this.state.selectedGender);
      } else {
        this.setState({ selectedGender: '' });
      }
    }

  changeSelectPriceList = selectedOption => {
    if (selectedOption !== null) {
      this.setState({ selectedPriceList: selectedOption });
      console.log(this.state.selectedPriceList);
    } else {
      this.setState({ selectedPriceList: '' });
    }
  }

  render() {
    const filteredProds = this.state.products.filter(product => {
      // return product.productId.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      const query = this.state.searchField.toLowerCase();
      return (
      product.productId.name.toLowerCase().indexOf(query) >= 0 
      || product.productId.genderId.name.toLowerCase().indexOf(query) >= 0
      || product.productId.manufacturerId.name.toLowerCase().indexOf(query) >= 0
      || product.productId.categoryId.name.toLowerCase().indexOf(query) >= 0
      )
    });
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            {this.context.token && (
              <div className="col-md-4 pt-4">
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
                          <label htmlFor="inputEmail4">Descripción</label>
                          <textarea type="text" id="name" ref={this.descriptionElRef} className="form-control" placeholder="Descripción del producto" />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputCity">Fabricante</label>
                          <Select
                            options={this.state.manufacturers}
                            onChange={this.changeSelectManu}
                            ref={this.manufacturerElRef}
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
                            options={this.state.genders}
                            isMulti
                            onChange={this.changeSelectGender}
                            ref={this.genderElRef}
                            id="gender"
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
                            isMulti
                            onChange={this.changeSelectCate}
                            ref={this.categoryElRef}
                            id="category"
                            isSearchable={true}
                            isClearable={true}
                            className="basic-single"
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt._id}
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Lista de Precios</label>
                          <input type="text" id="name" ref={this.pricelistElRef} className="form-control" defaultValue={this.state.currentpricelistname} readOnly />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Precio</label>
                          <input type="number" id="price" ref={this.priceElRef} className="form-control" placeholder="Precio" />
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
                          <p><SuccessIndicator size='96px' color='green' /></p>
                          <p> Articulo agregado! </p>
                          <button type="button" className="btn btn-success" onClick={this.successHandler}>OK!</button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            )}
            <div className="col-md-8">
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
