'use client';

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="p-2 bg-gray-800 text-white">
      <a href="/" className="mx-2 text-white no-underline">Home</a>
      <a href="/create" className="mx-2 text-white no-underline">Create a list</a>
      <a href="/list" className="mx-2 text-white no-underline">View Community Lists</a>
    </nav>
  );
};

export default Navbar;