import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class Single extends Component {
  
  render () {
    return (
        <Select options={options} />
    );
  };
}

export default Single;
