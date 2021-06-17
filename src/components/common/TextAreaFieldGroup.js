import React from 'react';
import classnames from 'classnames'
import PropType from 'prop-types'

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    
    info,
    error,
    onChange,

}) =>{
  return (
    <div className="form-group">
        <textarea 
            
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })} 
            placeholder={placeholder} 
            name={name}
            value={value}
            onChange={onChange}
            
        />
        {info && <small className ="form-=text text-muted">{info}</small>}
        {error && <div className="invalid-feedback" >{error}</div> }
    </div>
  );
};

TextAreaFieldGroup.prototype ={
    name: PropType.string.isRequired,
    placeholder: PropType.string,
    value: PropType.string.isRequired,
 
    info: PropType.string,
    error: PropType.string,
    
    onChange: PropType.func.isRequired,
   

}


   
export default TextAreaFieldGroup;