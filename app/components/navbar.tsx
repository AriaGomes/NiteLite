'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="p-2 bg-gray-800 text-white">
      <Link href="/" className="mx-2 text-white no-underline">Home</Link>
      <Link href="/create" className="mx-2 text-white no-underline">Create list</Link>
      <Link href="/list" className="mx-2 text-white no-underline">View Lists</Link>
    </nav>
  );
};

export default Navbar;