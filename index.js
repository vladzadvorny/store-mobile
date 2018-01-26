import { AppRegistry } from 'react-native';
import React from 'react';

import Setup from './js/boot/setup';

class App extends React.Component {
  render() {
    return <Setup />;
  }
}

AppRegistry.registerComponent('StoreMobile', () => App);
