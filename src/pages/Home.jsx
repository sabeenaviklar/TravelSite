import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDestinations } from '../features/destinations/destinationsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { destinations, status } = useSelector((state) => state.destinations);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDestinations());
    }
  }, [dispatch, status]);

  // Featured destinations (first 3)
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the Wizarding World</h1>
          <p>
            Discover magical destinations from the Harry Potter universe.
            Book your journey to Hogwarts, Diagon Alley, and beyond!
          </p>
          <Link to="/destinations" className="btn btn-hero">
            View Magical Destinations
          </Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-destinations">
        <div className="container">
          <h2 className="section-title">Featured Magical Destinations</h2>
          <div className="destinations-grid">
            {featuredDestinations.map((destination) => (
              <div key={destination._id} className="featured-card">
                <div className="featured-image">
                  <img src={destination.imageUrl} alt={destination.name} />
                </div>
                <div className="featured-content">
                  <h3>{destination.name}</h3>
                  <p className="featured-location">{destination.location}</p>
                  <p className="featured-price">
                    From {destination.price} Galleons
                  </p>
                  <Link to={`/destinations/${destination._id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/destinations" className="btn btn-secondary">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Hogwarts Houses Section */}
      <section className="houses-section">
        <div className="container">
          <h2 className="section-title">Hogwarts Houses</h2>
          <p className="section-description">
            Learn about the four houses of Hogwarts School of Witchcraft and Wizardry.
            Which house would the Sorting Hat place you in?
          </p>
          <div className="houses-grid">
            <div className="house-card gryffindor">
              <h3>Gryffindor</h3>
              <p>"Where dwell the brave at heart"</p>
            </div>
            <div className="house-card hufflepuff">
              <h3>Hufflepuff</h3>
              <p>"Where they are just and loyal"</p>
            </div>
            <div className="house-card ravenclaw">
              <h3>Ravenclaw</h3>
              <p>"Where those of wit and learning"</p>
            </div>
            <div className="house-card slytherin">
              <h3>Slytherin</h3>
              <p>"Those cunning folk use any means"</p>
            </div>
          </div>
          <div className="view-all">
            <Link to="/houses" className="btn btn-secondary">
              Learn More About Houses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Wizards & Witches Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Absolutely magical experience! The tour of Hogwarts was everything
                  I dreamed of and more. The moving staircases were a delight!"
                </p>
              </div>
              <div className="testimonial-author">
                <p className="author-name">Hermione Granger</p>
                <p className="author-title">Ministry of Magic Employee</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Brilliant service! The portkey was right on time, and the
                  accommodations at The Leaky Cauldron were cozy and welcoming."
                </p>
              </div>
              <div className="testimonial-author">
                <p className="author-name">Ron Weasley</p>
                <p className="author-title">Auror</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "My visit to Diagon Alley was unforgettable. The shopping
                  experience at Ollivanders was particularly magical!"
                </p>
              </div>
              <div className="testimonial-author">
                <p className="author-name">Luna Lovegood</p>
                <p className="author-title">Magizoologist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          height: 600px;
          background-image: url('/assets/images/hogwarts-hero.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
          color: white;
          display: flex;
          align-items: center;
          margin-top: -2rem;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }
        .hero-content {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .btn-hero {
          font-size: 1.1rem;
          padding: 0.75rem 2rem;
          background-color: var(--secondary);
          color: var(--text-dark);
        }
        .btn-hero:hover {
          background-color: var(--secondary-dark);
        }
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--primary);
        }
        .featured-destinations,
        .houses-section,
        .testimonials {
          padding: 4rem 0;
        }
        .houses-section {
          background-color: #f5f5f5;
        }
        .section-description {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
          color: #666;
        }
        .destinations-grid,
        .houses-grid,
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .featured-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .featured-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .featured-image {
          height: 200px;
          overflow: hidden;
        }
        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .featured-card:hover .featured-image img {
          transform: scale(1.05);
        }
        .featured-content {
          padding: 1.5rem;
        }
        .featured-location {
          color: #666;
          margin-bottom: 0.5rem;
        }
        .featured-price {
          font-weight: bold;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .view-all {
          text-align: center;
          margin-top: 2rem;
        }
        .house-card {
          height: 200px;
          border-radius: 8px;
          padding: 1.5rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .house-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        }
        .house-card:hover {
          transform: scale(1.03);
        }
        .house-card h3,
        .house-card p {
          position: relative;
          z-index: 1;
        }
        .house-card h3 {
          margin-bottom: 0.5rem;
        }
        .gryffindor {
          background-color: var(--gryffindor-red);
          background-image: url('/assets/images/houses/gryffindor-bg.jpg');
        }
        .hufflepuff {
          background-color: var(--hufflepuff-yellow);
          background-image: url('/assets/images/houses/hufflepuff-bg.jpg');
        }
        .ravenclaw {
          background-color: var(--ravenclaw-blue);
          background-image: url('/assets/images/houses/ravenclaw-bg.jpg');
        }
        .slytherin {
          background-color: var(--slytherin-green);
          background-image: url('/assets/images/houses/slytherin-bg.jpg');
        }
        .testimonial-card {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .testimonial-content {
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .testimonial-content p::before,
        .testimonial-content p::after {
          content: '"';
          color: var(--secondary);
          font-size: 1.5rem;
        }
        .author-name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .author-title {
          color: #666;
          font-size: 0.875rem;
        }
        @media (max-width: 768px) {
          .hero {
            height: 500px;
          }
          .hero h1 {
            font-size: 2.5rem;
          }
          .destinations-grid,
          .houses-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
