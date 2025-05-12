import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '',
  ...rest 
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant === 'secondary' ? 'btn-secondary' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
