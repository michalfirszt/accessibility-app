import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import paths from '../../routes/paths';
import { Navbar } from '../Navbar';

const useStyles = createUseStyles({
  contrastContainer: {
    '& nav': {
      backgroundColor: 'yellow',
    },

    '& nav a': {
      color: 'black',
    },

    '& nav .text-white': {
      color: 'white',
    },

    '& nav .border': {
      backgroundColor: 'black',
      border: '1px solid black',
    },

    '& main': {
      color: 'white',
      backgroundColor: 'black',
    },

    '& main .bg-gray-700': {
      backgroundColor: 'yellow',
      border: '1px solid white',
      color: 'black',
    },

    '& main .rounded': {
      border: '1px solid white',
    },

    '& main .text-base': {
      color: 'white',
    },
  },
});

const navbarLinks = [
  {
    name: 'SignIn',
    path: paths.root,
  },
];

export const PageLayout = () => {
  const classes = useStyles();
  const [contrast, setContrast, removeContrast] = useLocalStorage('contrast');
  const [isContrastEnabled, setIsContrastEnabled] = useState(!!contrast);

  const tolggleContrast = useCallback(() => {
    if (!!contrast) {
      removeContrast();
      setIsContrastEnabled(false);
    }

    if (!contrast) {
      setContrast('contrast');
      setIsContrastEnabled(true);
    }
  }, [contrast, removeContrast, setContrast]);

  return (
    <div className={`${isContrastEnabled && classes.contrastContainer}`}>
      <Navbar links={navbarLinks} tolggleContrast={tolggleContrast} />
      <main className="flex-auto pt-16 h-100">
        <Outlet />
      </main>
    </div>
  );
};
