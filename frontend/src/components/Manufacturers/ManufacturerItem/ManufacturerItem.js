import React from 'react';
// import '../../Products/ProductItem/ProductItem.css';

const manufacturerItem = props => (
        
		<div key={props._id} className="product-card">
			
            <h5>{props.name}</h5>
			<div className="product-info">
            <h6>Dirección: {props.address}</h6>
            <h6>Teléfono: {props.phone}</h6>
            <h6>Nombre Contacto: {props.primary_contact_name}</h6>
            <h6>Teléfono Contacto: {props.primary_contact_phone}</h6>
            <h6>{props.createAt}</h6>
			</div>
		</div>


);

export default manufacturerItem;