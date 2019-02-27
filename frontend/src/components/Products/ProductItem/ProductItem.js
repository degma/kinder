import React from 'react';
import './ProductItem.css';

const eventItem = props => (
        
		<div className="product-card">
			<div className="product-image">
				{/* <img src="https://cdn.shopify.com/s/files/1/0938/8938/products/10231100205_1_1315x1800_300_CMYK_1024x1024.jpeg?v=1445623369"/> */}
			</div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                    {props.manufacturerId.name} | &nbsp;
                    {props.genderId.map(cat => { return ( <li class="breadcrumb-item active" aria-current="page">{cat.name}</li>)})}                        
                    </ol>
                </nav>
			<div className="product-info">
                <div className="row">
                    <div className="col-md-9">
                        <h5>{props.name}</h5>
                    </div>
                    <div className="col-md-3 text-center">
                        ${props.price}
                    </div>
                </div>
                <div> <h6>{props.description}</h6> </div>
                <div className="mt-2">
                    {props.categoryId.map(cat => { return ( <span class="badge badge-secondary mr-1">{cat.name}</span>)})}        
                </div>
                
			</div>
		</div>


);

export default eventItem;