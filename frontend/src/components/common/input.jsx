import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className='flx-1'>
          <input {...rest} name={name} id={name} className="form-control" />
          {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
