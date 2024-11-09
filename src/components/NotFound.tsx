import React from 'react';
import './NotFound.css';  // We'll add some custom CSS for styling
import Link from './Link';  // We'll use our custom Link component

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-submessage">But don't worry, you can always go back to the homepage.</p>
        <Link to="/" className="back-home-button">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
