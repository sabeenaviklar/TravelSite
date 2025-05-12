import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Wizarding Travels</h1>
        
        <section className="about-section">
          <div className="about-content">
            <h2>Our Magical Story</h2>
            <p>
              Founded in 1998 after the Battle of Hogwarts, Wizarding Travels was established
              to bridge the gap between the magical and Muggle worlds. Our founder, a former
              Ministry of Magic employee, saw an opportunity to share the wonders of the
              wizarding world with Muggles who had always dreamed of experiencing magic.
            </p>
            <p>
              With special permission from the Ministry and in collaboration with the
              Department of Magical Cooperation, we created a unique travel service that
              allows Muggles to visit magical locations under controlled and safe conditions.
            </p>
            <p>
              Today, we are the premier magical travel agency, offering exclusive access to
              iconic locations from the Harry Potter universe. Our team consists of both
              wizards and Muggles working together to create unforgettable magical experiences.
            </p>
          </div>
          <div className="about-image">
            <img src="/assets/images/ui/about-image.jpg" alt="Wizarding Travels Office" />
          </div>
        </section>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <p>
              At Wizarding Travels, our mission is to bring the magic of the wizarding world
              to life for all who believe in it. We strive to create authentic, immersive
              experiences that capture the wonder and enchantment of the Harry Potter universe.
            </p>
            <p>
              We are committed to:
            </p>
            <ul className="mission-list">
              <li>Providing safe and accessible magical experiences for all</li>
              <li>Preserving the integrity and wonder of magical locations</li>
              <li>Creating memories that last a lifetime</li>
              <li>Fostering understanding and appreciation between magical and non-magical communities</li>
              <li>Upholding the Statute of Secrecy while sharing magical wonders</li>
            </ul>
          </div>
        </section>
        
        <section className="team-section">
          <h2>Our Magical Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/ui/team-1.jpg" alt="Team Member" />
              </div>
              <h3>Minerva Wilkins</h3>
              <p className="member-title">Founder & CEO</p>
              <p className="member-house">Gryffindor</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/ui/team-2.jpg" alt="Team Member" />
              </div>
              <h3>Albus Fletcher</h3>
              <p className="member-title">Head of Destinations</p>
              <p className="member-house">Ravenclaw</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/ui/team-3.jpg" alt="Team Member" />
              </div>
              <h3>Pomona Jenkins</h3>
              <p className="member-title">Customer Experience</p>
              <p className="member-house">Hufflepuff</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/ui/team-4.jpg" alt="Team Member" />
              </div>
              <h3>Severus Black</h3>
              <p className="member-title">Security & Safety</p>
              <p className="member-house">Slytherin</p>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <h2>Ready to Experience the Magic?</h2>
          <p>
            Join thousands of satisfied travelers who have experienced the wonder
            of the wizarding world through our magical journeys.
          </p>
          <div className="cta-buttons">
            <Link to="/destinations" className="btn">
              Browse Destinations
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          padding: 2rem 0;
        }
        .about-section,
        .mission-section,
        .team-section,
        .cta-section {
          margin-bottom: 4rem;
        }
        .about-section {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
          align-items: center;
        }
        .about-content h2,
        .mission-section h2,
        .team-section h2,
        .cta-section h2 {
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        .about-content p,
        .mission-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .about-image {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .about-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .mission-list {
          margin-left: 1.5rem;
          margin-top: 1rem;
        }
        .mission-list li {
          margin-bottom: 0.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .team-member {
          text-align: center;
        }
        .member-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid var(--primary);
        }
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .member-title {
          color: #666;
          margin-bottom: 0.25rem;
        }
        .member-house {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        .team-member:nth-child(1) .member-house {
          background-color: rgba(116, 0, 1, 0.1);
          color: var(--gryffindor-red);
        }
        .team-member:nth-child(2) .member-house {
          background-color: rgba(14, 26, 64, 0.1);
          color: var(--ravenclaw-blue);
        }
        .team-member:nth-child(3) .member-house {
          background-color: rgba(236, 185, 57, 0.1);
          color: var(--hufflepuff-yellow);
        }
        .team-member:nth-child(4) .member-house {
          background-color: rgba(26, 71, 42, 0.1);
          color: var(--slytherin-green);
        }
        .cta-section {
          text-align: center;
          padding: 3rem;
          background-color: #f5f5f5;
          border-radius: 8px;
        }
        .cta-section p {
          max-width: 600px;
          margin: 0 auto 2rem;
        }
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .about-section {
            grid-template-columns: 1fr;
          }
          .about-image {
            order: -1;
          }
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
