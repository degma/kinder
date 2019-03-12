import React from "react";
import "./ProductItem.css";

const productCardItem = props => (
  <div className="product-card mb-2">
    <div className="product-image" />
    <nav aria-label="breadcrumb">
      <div>
        <ol className="breadcrumb">
          {props.manufacturerId.name} | &nbsp;
          {props.genderId.map(cat => {
            return (
              <li
                className="breadcrumb-item"
                aria-current="page"
                key={cat.name}
              >
                {cat.name}
              </li>
            );
          })}
          <span className="pull-right">${props.price}</span>
        </ol>
      </div>
    </nav>
    <div className="product-info">
      <div className="row">
        <div className="col-md-10">
          <h5>{props.name}</h5>
          <h6>{props.description}</h6>
          <div className="mt-2">
            <span class="categorias">Categorias:&nbsp;</span>
            <span>
              {props.categoryId.map(cat => {
                return (
                  <span key={cat.name} className="badge mr-1">
                    {cat.name}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
        <div className="col-md-2 d-flex flex-column">
          
            
          
          <div className="align-self-baseline">
            <button
              type="button"
              className="btn btn-danger botones-card"
              onClick={() => props.triggerEvent(props.prodId)}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default productCardItem;
