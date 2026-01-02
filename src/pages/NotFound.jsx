import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">404 - Page Not Found</h1>
      <p className="mb-4">The page you’re looking for doesn’t exist or was moved.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}