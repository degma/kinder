import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem/ProductItem';


const productList = props => {
  const products = props.products.map(product => {
    return (
      <div className="col-md-4 p-1">
        <ProductItem
          key={product.productId._id}
          name={product.productId.name}
          description={product.productId.description}
          categoryId={product.productId.categoryId}
          manufacturerId={product.productId.manufacturerId}
          genderId={product.productId.genderId}
          price={product.price}   
        />
      </div>
      
    );
  });

  return <div className="d-flex flex-wrap">{products}</div>;
};

export default productList;