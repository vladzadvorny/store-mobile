import React from 'react';
import { Root } from 'native-base';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store';
import AppWithNavigationState from './navigators/AppNavigator';

export default () => (
  <ReduxProvider store={store}>
    <Root>
      <AppWithNavigationState />
    </Root>
  </ReduxProvider>
);
