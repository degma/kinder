import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {!context.token && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth">Authenticate</NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">Articulos</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/bookings">Bookings</NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;