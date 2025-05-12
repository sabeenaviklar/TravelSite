import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinationById } from '../destinations/destinationsSlice';
import { createBooking, resetBookingStatus } from './bookingsSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const BookingForm = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedDestination } = useSelector((state) => state.destinations);
  const { status, error, currentBooking } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    travelers: 1,
    specialRequests: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(resetBookingStatus());
    if (!selectedDestination || selectedDestination._id !== destinationId) {
      dispatch(fetchDestinationById(destinationId));
    }
  }, [dispatch, destinationId, selectedDestination]);

  useEffect(() => {
    if (selectedDestination && formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        const price = selectedDestination.price * formData.travelers * days;
        setTotalPrice(price);
      }
    }
  }, [formData, selectedDestination]);

  useEffect(() => {
    if (status === 'succeeded' && currentBooking) {
      navigate('/booking-confirmation', { state: { booking: currentBooking } });
    }
  }, [status, currentBooking, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'travelers' ? parseInt(value, 10) : value,
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    } else if (startDate < today) {
      errors.startDate = 'Start date cannot be in the past';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    } else if (endDate < startDate) {
      errors.endDate = 'End date must be after start date';
    }
    
    if (formData.travelers < 1) {
      errors.travelers = 'At least 1 traveler is required';
    } else if (formData.travelers > 10) {
      errors.travelers = 'Maximum 10 travelers allowed';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bookingData = {
        destination: destinationId,
        user: user._id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelers: formData.travelers,
        totalPrice,
        specialRequests: formData.specialRequests,
      };
      
      dispatch(createBooking(bookingData));
    }
  };

  if (!selectedDestination) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading destination details...</p>
      </div>
    );
  }

  return (
    <div className="booking-form-container">
      <div className="container">
        <h1 className="page-title">Book Your Magical Journey</h1>
        
        <div className="booking-content">
          <div className="destination-summary">
            <div className="destination-image">
              <img src={selectedDestination.imageUrl} alt={selectedDestination.name} />
            </div>
            <div className="destination-info">
              <h2>{selectedDestination.name}</h2>
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
              </div>
              <p className="destination-price">
                <span className="price">{selectedDestination.price} Galleons</span>
                <span className="price-note">per person per day</span>
              </p>
            </div>
          </div>
          
          <div className="booking-form-wrapper">
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <Input
                  label="Start Date"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  error={formErrors.startDate}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                
                <Input
                  label="End Date"
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  error={formErrors.endDate}
                  required
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <Input
                label="Number of Travelers"
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                error={formErrors.travelers}
                required
                min="1"
                max="10"
              />
              
              <div className="form-group">
                <label htmlFor="specialRequests" className="form-label">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or requirements?"
                  className="form-textarea"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-item">
                  <span>Destination:</span>
                  <span>{selectedDestination.name}</span>
                </div>
                {formData.startDate && formData.endDate && (
                  <div className="summary-item">
                    <span>Duration:</span>
                    <span>
                      {Math.ceil(
                        (new Date(formData.endDate) - new Date(formData.startDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </span>
                  </div>
                )}
                <div className="summary-item">
                  <span>Travelers:</span>
                  <span>{formData.travelers}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Price:</span>
                  <span>{totalPrice} Galleons</span>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="submit-btn"
              >
                {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking-form-container {
          padding: 2rem 0;
        }
        .booking-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }
        .destination-summary {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .destination-image {
          height: 200px;
          overflow: hidden;
        }
        .destination-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .destination-info {
          padding: 1.5rem;
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
          font-size: 1.25rem;
          margin-right: 2px;
        }
        .star.filled {
          color: var(--secondary);
        }
        .destination-price {
          margin-top: 1rem;
        }
        .price {
          font-weight: bold;
          color: var(--primary);
          margin-right: 0.5rem;
        }
        .price-note {
          color: #666;
          font-size: 0.875rem;
        }
        .booking-form-wrapper {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
        }
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        .booking-summary {
          margin: 2rem 0;
          padding: 1.5rem;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        .booking-summary h3 {
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed #ddd;
        }
        .summary-item.total {
          font-weight: bold;
          font-size: 1.1rem;
          margin-top: 1rem;
          border-bottom: none;
          color: var(--primary);
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .booking-content {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
