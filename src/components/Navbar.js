import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const getLinkClassName = (currentPath, path) =>
  currentPath === path
    ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

export const Navbar = ({ links, tolggleContrast }) => {
  const { pathname } = useLocation();

  const navbarLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        className: getLinkClassName(pathname, link.path),
      })),
    [links, pathname]
  );

  return (
    <nav className="bg-gray-800 fixed shadow-lg w-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
              {navbarLinks.map(({ name, path, className }, index) => (
                <Link
                  key={index}
                  to={path}
                  className={className}
                  aria-current="page"
                >
                  {name}
                </Link>
              ))}
              <button
                onClick={tolggleContrast}
                className="py-2 px-4 border text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                Contrast
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
