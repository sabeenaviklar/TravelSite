import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHouses, setSelectedHouse } from './housesSlice';

const HousesList = () => {
  const dispatch = useDispatch();
  const { houses, selectedHouse, status, error } = useSelector((state) => state.houses);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHouses());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (houses.length > 0 && !selectedHouse) {
      dispatch(setSelectedHouse(houses[0]));
      setActiveTab(houses[0].id);
    }
  }, [houses, selectedHouse, dispatch]);

  const handleHouseSelect = (house) => {
    dispatch(setSelectedHouse(house));
    setActiveTab(house.id);
  };

  if (status === 'loading' && houses.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>The Sorting Hat is thinking...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          className="btn" 
          onClick={() => dispatch(fetchHouses())}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!selectedHouse) {
    return null;
  }

  return (
    <div className="houses-container">
      <div className="container">
        <h1 className="page-title">Hogwarts Houses</h1>
        
        <div className="houses-tabs">
          {houses.map((house) => (
            <button
              key={house.id}
              className={`house-tab ${activeTab === house.id ? 'active' : ''} ${house.id}`}
              onClick={() => handleHouseSelect(house)}
            >
              {house.name}
            </button>
          ))}
        </div>
        
        <div className="house-details">
          <div className="house-header" style={{ backgroundColor: getHouseColor(selectedHouse.id) }}>
            <div className="house-image">
              <img src={selectedHouse.imageUrl || '/assets/images/houses/default.jpg'} alt={selectedHouse.name} />
            </div>
            <div className="house-header-content">
              <h2>{selectedHouse.name}</h2>
              <p className="house-founder">Founded by {selectedHouse.founder}</p>
              <div className="house-colors">
                <span className="color-label">Colors:</span>
                {selectedHouse.colors.map((color, index) => (
                  <span key={index} className="color-value">
                    {color}{index < selectedHouse.colors.length - 1 ? ' & ' : ''}
                  </span>
                ))}
              </div>
              <p className="house-animal">
                <span className="animal-label">Animal:</span>
                <span className="animal-value">{selectedHouse.animal}</span>
              </p>
              <p className="house-element">
                <span className="element-label">Element:</span>
                <span className="element-value">{selectedHouse.element}</span>
              </p>
            </div>
          </div>
          
          <div className="house-body">
            <div className="house-description">
              <h3>About {selectedHouse.name}</h3>
              <p>{selectedHouse.description}</p>
              <p className="common-room">
                <strong>Common Room:</strong> {selectedHouse.commonRoom}
              </p>
            </div>
            
            <div className="house-traits">
              <h3>House Traits</h3>
              <ul className="traits-list">
                {selectedHouse.traits.map((trait, index) => (
                  <li key={index} className="trait-item">
                    <span className="trait-icon">✦</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="famous-members">
              <h3>Famous Members</h3>
              <ul className="members-list">
                {selectedHouse.famousMembers.map((member, index) => (
                  <li key={index} className="member-item">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

     <style jsx>{`
        .houses-container {
          padding: 2rem 0;
        }
        .houses-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .house-tab {
          padding: 0.75rem 1.5rem;
          margin: 0 0.5rem;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
          font-family: var(--font-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 4px;
        }
        .house-tab.active {
          color: white;
        }
        .house-tab.gryffindor.active {
          background-color: var(--gryffindor-red);
        }
        .house-tab.hufflepuff.active {
          background-color: var(--hufflepuff-yellow);
          color: var(--text-dark);
        }
        .house-tab.ravenclaw.active {
          background-color: var(--ravenclaw-blue);
        }
        .house-tab.slytherin.active {
          background-color: var(--slytherin-green);
        }
        .house-details {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .house-header {
          display: grid;
          grid-template-columns: 300px 1fr;
          color: white;
        }
        .house-image {
          height: 300px;
        }
        .house-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .house-header-content {
          padding: 2rem;
        }
        .house-header-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .house-founder,
        .house-colors,
        .house-animal,
        .house-element {
          margin-bottom: 0.75rem;
        }
        .color-label,
        .animal-label,
        .element-label {
          font-weight: bold;
          margin-right: 0.5rem;
        }
        .house-body {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .house-description {
          grid-column: 1 / -1;
        }
        .house-description h3,
        .house-traits h3,
        .famous-members h3 {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .common-room {
          margin-top: 1rem;
        }
        .traits-list,
        .members-list {
          list-style: none;
        }
        .trait-item,
        .member-item {
          margin-bottom: 0.5rem;
        }
        .trait-icon {
          color: var(--secondary);
          margin-right: 0.5rem;
        }
        @media (max-width: 768px) {
          .house-header {
            grid-template-columns: 1fr;
          }
          .house-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to get house color for styling
const getHouseColor = (houseId) => {
  switch (houseId) {
    case 'gryffindor':
      return 'var(--gryffindor-red)';
    case 'hufflepuff':
      return 'var(--hufflepuff-yellow)';
    case 'ravenclaw':
      return 'var(--ravenclaw-blue)';
    case 'slytherin':
      return 'var(--slytherin-green)';
    default:
      return '#333';
  }
};

export default HousesList;

