import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;  // The optional className prop
  target?: string; // Optional target for the link (e.g. _blank for opening in a new tab)
}

const Link: React.FC<LinkProps> = ({ to, children, className, target }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent the default anchor tag behavior

    // Use navigate to change the route programmatically
    navigate(to);
  };

  return (
    // Use a button or div for navigation, styled as a link if needed
    <button
      onClick={handleClick}
      className={className}
      style={{ all: 'unset', cursor: 'pointer' }} // Remove default button styles, make it look like a link
    >
      {children}
    </button>
  );
};

export default Link;
