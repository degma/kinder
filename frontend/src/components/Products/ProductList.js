import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem/ProductItem';


const productList = props => {
  const products = props.products.map(product => {
    return (
        <ProductItem
          name={product.productId.name}
          description={product.productId.description}
          categoryId={product.productId.categoryId}
          manufacturerId={product.productId.manufacturerId}
          genderId={product.productId.genderId}
          price={product.price}   
        />
    );
  });

  return products;
};

export default productList;