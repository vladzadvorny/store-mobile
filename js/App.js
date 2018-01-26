import React from 'react';
import { Root } from 'native-base';

import AppWithNavigationState from './navigators/AppNavigator';

export default () => (
  <Root>
    <AppWithNavigationState />
  </Root>
);
