import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import MainNavigator from './source/navigators/MainNavigator';
import { Provider } from 'react-redux'
import MyStore from './source/redux/MyStore';

const App = () => {
  return (
    <Provider store={MyStore}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
