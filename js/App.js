import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Home from './screens/home';
import Anatomy from './screens/anatomy';
import SideBar from './screens/sidebar';

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Anatomy: { screen: Anatomy }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

export default () => (
  <Root>
    <AppNavigator />
  </Root>
);
