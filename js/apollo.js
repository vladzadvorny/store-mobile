import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';

import { uri } from './config';
import store from './store';
import { signOut } from './actions';

const httpLink = new HttpLink({ uri });

const middlewareLink = setContext(async () => ({
  headers: {
    'x-token': await AsyncStorage.getItem('@Auth:token'),
    'x-refresh-token': await AsyncStorage.getItem('@Auth:refreshToken'),
    'x-locale': await AsyncStorage.getItem('@locale')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        console.log(token);
        if (token !== 'remove') {
          AsyncStorage.setItem('@Auth:token', token);
        } else {
          AsyncStorage.removeItem('@Auth:token');
          store.dispatch(signOut());
        }
      }

      if (refreshToken) {
        if (refreshToken !== 'remove') {
          AsyncStorage.setItem('@Auth:refreshToken', refreshToken);
        } else {
          AsyncStorage.removeItem('@Auth:refreshToken');
          store.dispatch(signOut());
        }
      }
    }

    return response;
  })
);

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
