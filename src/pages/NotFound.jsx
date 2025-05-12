import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Looks like this page vanished like a Demiguise!</p>
          <p>The page you're looking for might have been moved, deleted, or perhaps never existed.</p>
          <Link to="/" className="btn">
            Return to Homepage
          </Link>
        </div>
      </div>

      <style jsx>{`
        .not-found {
          padding: 4rem 0;
          text-align: center;
        }
        .not-found-content {
          max-width: 600px;
          margin: 0 auto;
        }
        .not-found h1 {
          font-size: 6rem;
          color: var(--primary);
          margin-bottom: 0;
        }
        .not-found h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .not-found p {
          margin-bottom: 1rem;
          color: #666;
        }
        .not-found .btn {
          margin-top: 2rem;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
