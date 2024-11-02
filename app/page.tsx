"use client";

import React from 'react';
// import SpaceScene from '@/components/SpaceScene/SpaceScene';
import SpaceGame from '@/components/SpaceGame/SpaceGame';
import { Provider } from 'react-redux';
import store from '../state/store';
import { VFXProvider } from 'react-vfx';

const HomePage = () => {
  return (
    <VFXProvider>
    <Provider store={store}>
      {/* <SpaceScene /> */}
      <SpaceGame />
    </Provider>
    </VFXProvider>
  );
};

export default HomePage;
