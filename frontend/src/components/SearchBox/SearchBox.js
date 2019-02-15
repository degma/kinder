import React from 'react';

const SearchBox =({searchfield, searchChange}) => {
    return (
            
              <div className="pt-4 pb-4 pl-0 mx-auto">
                <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Buscar</span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-lg" 
                    placeholder="Buscar articulo..."
                    onChange={searchChange}
                    />
                </div>
              </div>
    );
}

export default SearchBox;