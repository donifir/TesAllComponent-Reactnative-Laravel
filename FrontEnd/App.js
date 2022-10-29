// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './src/app/store';
import {Provider} from 'react-redux';
import RoutesStack from './src/routes';


function App() {
  return (
    <Provider store={store}>
      {/* {console.log(foundToken, 'this this this')} */}
      <NavigationContainer>
        <RoutesStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
