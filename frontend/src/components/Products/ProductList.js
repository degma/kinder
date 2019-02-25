import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem/ProductItem';


const productList = props => {
  const products = props.products.map(product => {
    return (
      <ProductItem
        key={product.productId._id}
        name={product.productId.name}
        categoryId={product.productId.categoryId}
        manufacturerId={product.productId.manufacturerId}
        genderId={product.productId.genderId}
    
      />
    );
  });

  return <div className="d-flex flex-wrap">{products}</div>;
};

export default productList;