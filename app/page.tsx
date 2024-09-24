"use client";

import React from 'react';
// import SpaceScene from '@/components/SpaceScene/SpaceScene';
import SpaceGame from '@/components/SpaceGame/SpaceGame';
import { Provider } from 'react-redux';
import store from './state/store';

const HomePage = () => {
  return (
    <Provider store={store}>

      {/* <SpaceScene /> */}
      <SpaceGame />
    </Provider>
  );
};

export default HomePage;
