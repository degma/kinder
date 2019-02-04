import React from 'react';
import './ProductItem.css';

const eventItem = props => (
    <div className="pt-2 pr-2">
        <div className="card">
            <div className="card-header">{props.gender.name} | {props.category.name} | ${props.price} </div>
            <div className="card-body text-primary">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Fabricante: {props.manufacturer.name}</p>
            </div>
        </div>
    </div>

);

export default eventItem;