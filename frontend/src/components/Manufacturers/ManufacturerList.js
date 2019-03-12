import React from 'react';
import ManufacturerItem from './ManufacturerItem/ManufacturerItem';


const manufacturerList = props => {
  const manufacturers = props.manufacturers.map(manu => {
    return (
      <div key={manu.id} className="col-md-6 p-1">
        <ManufacturerItem
          id= {manu._id}
          name={manu.name}
          address={manu.address}
          phone={manu.phone}
          contactname={manu.primary_contact_name}
          contactphone={manu.primary_contact_phone}
          createdAt={manu.createdAt}
        />
      </div>
      
    );
  });

  return <div className="d-flex flex-wrap">{manufacturers}</div>;
};

export default manufacturerList;