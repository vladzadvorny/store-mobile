import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import client from '../apollo';
import store from '../store';
import locale from '../locale';

import getTheme from '../theme/components';
import variables from '../theme/variables/commonColor';
import App from '../App';

locale(store);

export default class Setup extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <StyleProvider style={getTheme(variables)}>
            <App />
          </StyleProvider>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}
