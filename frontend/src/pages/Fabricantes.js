import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import ManufacturerList from '../components/Manufacturers/ManufacturerList';
import Spinner from '../components/Spinner/Spinner';
import SearchBox from '../components/SearchBox/SearchBox';
// const SweetAlert = require('react-bootstrap-sweetalert');
const SuccessIndicator = require('react-success-indicator');
//import './Events.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    manufacturers: [],
    isLoading: false,
    isSuccess: false,
    searchField: ''
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.addressElRef = React.createRef();
    this.phoneElRef = React.createRef();
    this.contactNameElRef = React.createRef();
    this.contactPhoneElRef = React.createRef();
    
  }

  componentDidMount() {
    this.fetchManufacturers();
 
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {

    const name = this.nameElRef.current.value;
    const address = this.addressElRef.current.value;
    const phone = this.phoneElRef.current.value;
    const primary_contact_name = this.contactNameElRef.current.value;
    const primary_contact_phone = this.contactPhoneElRef.current.value;
    

    if (
      name.trim().length === 0 
    ) {
      return;
    }

    // const manuf = { name, address, phone, primary_contact_name, primary_contact_phone };

    const requestBody = {
      query: `
          mutation {
            createManufacturer(manufacturerInput:{
                  name:"${name}", 
                  address:"${address}", 
                  phone:"${phone}", 
                  primary_contact_name:"${primary_contact_name}",
                  primary_contact_phone:"${primary_contact_phone}"
                }){
                  _id
                  name
                  address
                  phone
                  primary_contact_name
                  primary_contact_phone
                }
              }
        `
    };
    console.log(requestBody);

    const token = this.context.token;

    fetch('http://localhost:8080/graphql', {
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
          const updatedManufacturers = [...prevState.manufacturers];
          updatedManufacturers.push({
              _id: resData.data.createManufacturer._id,
              name: resData.data.createManufacturer.name,
              phone: resData.data.createManufacturer.phone,
              primary_contact_name: resData.data.createManufacturer.primary_contact_name,
              primary_contact_phone: resData.data.createManufacturer.primary_contact_phone
              
          });
          
          return { manufacturers: updatedManufacturers };

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
    
    this.nameElRef = "";
    this.addressElRef = "";
    this.phoneElRef = "";
    this.contactNameElRef = "";
    this.contactPhoneElRef = "";
    
    this.setState({ isSuccess: true });

  }

  successHandler = () => {
    this.setState({ isSuccess: false });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  fetchManufacturers() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          manufacturers{
            _id
            name
            address
            phone
            primary_contact_name
            primary_contact_phone
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
        const manufacturers = resData.data.manufacturers;
        if (this.isActive) {
          this.setState({ manufacturers: manufacturers, isLoading: false });
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
    const filteredManus = this.state.manufacturers.filter(manu => {
      // return product.productId.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      const query = this.state.searchField.toLowerCase();
      return (
        manu.name.toLowerCase().indexOf(query) >= 0 
        || manu.address.map(gen => gen.name.toLowerCase().indexOf(query)) >= 0
        || manu.primary_contact_name.toLowerCase().indexOf(query) >= 0
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
                      Ingresar Nuevo Fabricante
                    </div>
                    <div className="card-body p-1 pt-3">
                      <form>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Nombre</label>
                          <input type="text" id="name" ref={this.nameElRef} className="form-control" placeholder="Nombre del Fabricante" />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Dirección</label>
                          <input type="text" id="name" ref={this.addressElRef} className="form-control" placeholder="Dirección del Fabricante" />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Teléfono</label>
                          <input type="text" id="name" ref={this.phoneElRef} className="form-control" placeholder="Nombre del producto" />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Nombre Contacto</label>
                          <input type="text" id="name" ref={this.contactNameElRef} className="form-control" placeholder="Dirección del Fabricante" />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Teléfono Contacto</label>
                          <input type="text" id="name" ref={this.contactPhoneElRef} className="form-control" placeholder="Nombre del producto" />
                        </div>
                        <div className="form-group col-md-12 text-right pt-4">
                          <button type="button" className="btn btn-success" onClick={this.modalConfirmHandler}>+ Agregar Fabricante</button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                    <div className="card w-100 text-center pt-5">
                      <div className="pt-5">
                        <div className="form-group col-md-12">
                          <p><SuccessIndicator size='96px' color='green' /></p>
                          <br/>
                          <p> Fabricante agregado! </p>
                          <br/>
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
                  <ManufacturerList manufacturers={filteredManus} />
                )}

            </div>

          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default ProductsPage;
