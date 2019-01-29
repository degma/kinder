import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem/ProductItem';


const productList = props => {
  const products = props.products.map(product => {
    return (
      <ProductItem
        key={product._id}
        eventId={product._id}
        name={product.name}
        price={product.price}
        category={product.category}
        manufacturer={product.manufacturer}
        gender={product.gender}
        creatorId={product.creator._id}
      />
    );
  });

  return <div className="d-flex flex-wrap">{products}</div>;
};

export default productList;