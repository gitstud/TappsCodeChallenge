import React from 'react';
import { StyleSheet, } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Navigator from './app/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './app/store';
import { getLocation } from './app/actions/pins';

const { store, persistor } = createStore();

getLocation(store);

const AppContainer = createAppContainer(Navigator);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;