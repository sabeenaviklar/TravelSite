import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinationById, clearSelectedDestination } from './destinationsSlice';
import Button from '../../components/common/Button';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDestination, status, error } = useSelector(
    (state) => state.destinations
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDestinationById(id));

    return () => {
      dispatch(clearSelectedDestination());
    };
  }, [dispatch, id]);

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/booking/${id}`);
    } else {
      navigate('/login', { state: { from: { pathname: `/booking/${id}` } } });
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Summoning destination details...</p>
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
          onClick={() => dispatch(fetchDestinationById(id))}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!selectedDestination) {
    return null;
  }

  return (
    <div className="destination-detail">
      <div className="container">
        <div className="destination-header">
          <div className="destination-image">
            <img src={selectedDestination.imageUrl} alt={selectedDestination.name} />
          </div>
          <div className="destination-header-content">
            <h1>{selectedDestination.name}</h1>
            <p className="destination-location">{selectedDestination.location}</p>
            <div className="destination-rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${index < selectedDestination.rating ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
              <span className="rating-count">({selectedDestination.rating}/5)</span>
            </div>
            <div className="destination-price">
              <span className="price">{selectedDestination.price} Galleons</span>
              <span className="price-note">per person</span>
            </div>
            <Button onClick={handleBookNow} className="book-btn">
              Book Now
            </Button>
          </div>
        </div>

        <div className="destination-body">
          <div className="destination-description">
            <h2>About This Magical Destination</h2>
            <p>{selectedDestination.description}</p>
          </div>

          <div className="destination-features">
            <h2>Magical Features</h2>
            <ul className="features-list">
              {selectedDestination.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✨</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .destination-detail {
          padding: 2rem 0;
        }
        .destination-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .destination-image {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .destination-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .destination-header-content {
          display: flex;
          flex-direction: column;
        }
        .destination-location {
          color: #666;
          margin-bottom: 1rem;
        }
        .destination-rating {
          margin-bottom: 1rem;
        }
        .star {
          color: #ccc;
          font-size: 1.25rem;
          margin-right: 2px;
        }
        .star.filled {
          color: var(--secondary);
        }
        .rating-count {
          color: #666;
          margin-left: 0.5rem;
        }
        .destination-price {
          margin-bottom: 1.5rem;
        }
        .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary);
          margin-right: 0.5rem;
        }
        .price-note {
          color: #666;
        }
        .book-btn {
          align-self: flex-start;
          padding: 0.75rem 2rem;
        }
        .destination-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .destination-description h2,
        .destination-features h2 {
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .features-list {
          list-style: none;
        }
        .feature-item {
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }
        .feature-icon {
          margin-right: 0.5rem;
          color: var(--secondary);
        }
        @media (max-width: 768px) {
          .destination-header,
          .destination-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DestinationDetail;
