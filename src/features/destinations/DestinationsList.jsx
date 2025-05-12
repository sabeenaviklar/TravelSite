import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDestinations } from './destinationsSlice';
import DestinationCard from '../../components/common/DestinationCard';

const DestinationsList = () => {
  const dispatch = useDispatch();
  const { destinations, status, error } = useSelector((state) => state.destinations);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDestinations());
    }
  }, [status, dispatch]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDestinations = destinations.filter((destination) => {
    // Apply type filter
    const typeMatch = filter === 'all' || destination.type === filter;
    
    // Apply search filter
    const searchMatch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        destination.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  if (status === 'loading' && destinations.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading magical destinations...</p>
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
          onClick={() => dispatch(fetchDestinations())}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="destinations-container">
      <div className="container">
        <h1 className="page-title">Magical Destinations</h1>
        
        <div className="destinations-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'hogwarts' ? 'active' : ''}`}
              onClick={() => handleFilterChange('hogwarts')}
            >
              Hogwarts
            </button>
            <button 
              className={`filter-btn ${filter === 'diagon-alley' ? 'active' : ''}`}
              onClick={() => handleFilterChange('diagon-alley')}
            >
              Diagon Alley
            </button>
            <button 
              className={`filter-btn ${filter === 'hogsmeade' ? 'active' : ''}`}
              onClick={() => handleFilterChange('hogsmeade')}
            >
              Hogsmeade
            </button>
            <button 
              className={`filter-btn ${filter === 'ministry' ? 'active' : ''}`}
              onClick={() => handleFilterChange('ministry')}
            >
              Ministry
            </button>
            <button 
              className={`filter-btn ${filter === 'other' ? 'active' : ''}`}
              onClick={() => handleFilterChange('other')}
            >
              Other
            </button>
          </div>
        </div>
        
        {filteredDestinations.length === 0 ? (
          <div className="no-results">
            <p>No destinations found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="destinations-grid">
            {filteredDestinations.map((destination) => (
              <div key={destination._id} className="destination-item">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .destinations-container {
          padding: 2rem 0;
        }
        .destinations-controls {
          margin-bottom: 2rem;
        }
        .search-bar {
          margin-bottom: 1rem;
        }
        .search-bar input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .filter-btn {
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .filter-btn.active {
          background-color: var(--primary);
          color: white;
        }
        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .no-results {
          text-align: center;
          padding: 3rem 0;
          color: #666;
        }
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .error-container {
          text-align: center;
          padding: 3rem 0;
        }
        @media (max-width: 768px) {
          .destinations-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default DestinationsList;
