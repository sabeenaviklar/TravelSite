import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const DestinationCard = ({ destination }) => {
  return (
    <Card className="destination-card">
      <div className="destination-image">
        <img src={destination.imageUrl} alt={destination.name} />
      </div>
      <div className="destination-content">
        <h3>{destination.name}</h3>
        <p className="destination-location">{destination.location}</p>
        <div className="destination-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <span 
              key={index} 
              className={`star ${index < destination.rating ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="destination-price">
          {destination.price} Galleons
        </p>
        <Link to={`/destinations/${destination._id}`} className="btn">
          View Details
        </Link>
      </div>
      <style jsx>{`
        .destination-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .destination-image {
          height: 200px;
          overflow: hidden;
        }
        .destination-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .destination-card:hover .destination-image img {
          transform: scale(1.05);
        }
        .destination-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .destination-location {
          color: #666;
          margin-bottom: 0.5rem;
        }
        .destination-rating {
          margin-bottom: 0.5rem;
        }
        .star {
          color: #ccc;
          margin-right: 2px;
        }
        .star.filled {
          color: var(--secondary);
        }
        .destination-price {
          font-weight: bold;
          margin-bottom: 1rem;
          margin-top: auto;
        }
      `}</style>
    </Card>
  );
};

export default DestinationCard;
