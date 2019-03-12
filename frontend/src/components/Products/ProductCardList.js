import React from 'react';
import './ProductList.css';
import ProductCardItem from './ProductItem/ProductCardItem';


const productList = props => {
  const products = props.products.map(product => {
    return (
        <ProductCardItem
          key={product.productId._id}
          prodId={product.productId._id}
          name={product.productId.name}
          description={product.productId.description}
          categoryId={product.productId.categoryId}
          manufacturerId={product.productId.manufacturerId}
          genderId={product.productId.genderId}
          price={product.price}
          triggerEvent={props.modalconfirmBorrar}   
        />
    );
  });

  return products;
};

export default productList;