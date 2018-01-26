import React from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

import Home from '../screens/home';
import Anatomy from '../screens/anatomy';
import SideBar from '../screens/sidebar';

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

export const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
