import { lowerCase } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../routes/paths';

export const ProductLink = ({ children, productId, transcript }) => {
  const navigate = useNavigate();
  const linkRef = useRef(null);

  useEffect(() => {
    if (lowerCase(transcript) === lowerCase(children)) {
      linkRef.current.focus();

      navigate(paths.product(productId));
    }
  }, [children, navigate, productId, transcript]);

  return (
    <button
      ref={linkRef}
      onClick={() => navigate(paths.product(productId))}
      className="py-2 px-4 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
    >
      {children}
    </button>
  );
};
