import React from 'react';
import './ProductItem.css';

const productItem = props => (
        
    <tr>
      <th scope="row">{props.name}</th>
      <td>{props.description}</td>
      <td>{props.manufacturerId.name} </td>
      <td>{props.genderId.map(cat => { return ( <span className="badge mr-1 mb-1">{cat.name}</span>)})}</td>
      <td>{props.categoryId.map(cat => { return ( <span className="badge mr-1 mb-1">{cat.name}</span>)})}</td>
      <td>$ {props.price}</td>
    </tr>
 
/*         
		<div className="product-card">
			<div className="product-image">

			</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    {props.manufacturerId.name} | &nbsp;
                    {props.genderId.map(cat => { return ( <li className="breadcrumb-item" aria-current="page">{cat.name}</li>)})}                        
                    </ol>
                </nav>
			<div className="product-info">
                <div className="row">
                    <div className="col-md-7">
                        <h5>{props.name}</h5>
                        <h6>{props.description}</h6> 
                    </div>
                    <div className="col-md-3 text-center">
                        <div className="mt-2">
                        {props.categoryId.map(cat => { return ( <span className="badge mr-1">{cat.name}</span>)})}        
                        </div>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>${props.price}</h2>
                    </div>
                </div>
			</div>
		</div>
 */

);

export default productItem;