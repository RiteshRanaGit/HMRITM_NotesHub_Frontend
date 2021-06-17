import React from 'react';
import classnames from 'classnames'
import PropType from 'prop-types'

const SelectListGroup = ({
    name,
    value,
    options,
    info,
    error,
    onChange,

}) =>{
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option> 
    ));
  return (
    <div className="form-group">
        <select   
            
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })} 
             
            name={name}
            value={value}
            onChange={onChange}>
                {selectOptions}
        </select>
        {error && <div className="invalid-feedback" >{error}</div> }
        {info && <small className ="form-=text text-muted">{info}</small>}
        
    </div>
  );
};

SelectListGroup.prototype ={
    name: PropType.string.isRequired,
    
    value: PropType.string.isRequired,
    options: PropType.array.isRequired,
    info: PropType.string,
    error: PropType.string,
    
    onChange: PropType.func.isRequired,
   

}


   
export default SelectListGroup;