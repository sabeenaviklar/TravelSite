import React from 'react';

const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`card ${className}`} 
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
};

export default Card;
