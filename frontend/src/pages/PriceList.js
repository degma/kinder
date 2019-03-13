import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
import './PriceList.css';
import SearchBox from '../components/SearchBox/SearchBox';
// const SweetAlert = require('react-bootstrap-sweetalert');

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
    selectedCategory: null,
    selectedGender: null,
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
    this.fetchProducts();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
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

    fetch('http://localhost:8080/graphql', {
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

 

  componentWillUnmount() {
    this.isActive = false;
  }

 
  render() {
    const filteredProds = this.state.products.filter(product => {
      // return product.productId.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      const query = this.state.searchField.toLowerCase();
      return (
      product.productId.name.toLowerCase().indexOf(query) >= 0 
      || product.productId.genderId.map(gen => gen.name.toLowerCase().indexOf(query)) >= 0
      || product.productId.manufacturerId.name.toLowerCase().indexOf(query) >= 0
      || product.productId.categoryId.map(cat => cat.name.toLowerCase().indexOf(query)) >= 0
      )
    });
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <SearchBox searchChange={this.onSearchChange} />
              {this.state.isLoading ? (
                <div className="pt-5">
                  <Spinner />
                </div>
              ) : (
                <div className="col-md-12 p-1">
                  <table className="table table-sm table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Nombre Articulo</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fabricante</th>
                        <th scope="col">Genero</th>
                        <th scope="col">Categorías</th>
                        <th scope="col">Precio</th>
                      </tr>
                    </thead>
                      <tbody>
                      <ProductList products={filteredProds} />
                      </tbody>
                    </table>
                    </div>
                )}

            </div>

          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default ProductsPage;
