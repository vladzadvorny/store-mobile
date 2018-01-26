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
    'x-token': await AsyncStorage.getItem('@token'),
    'x-refresh-token': await AsyncStorage.getItem('@refreshToken'),
    'x-locale': await AsyncStorage.getItem('@locale')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(async response => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        console.log(token);
        if (token !== 'remove') {
          await AsyncStorage.setItem('@token', token);
        } else {
          await AsyncStorage.removeItem('@token');
          store.dispatch(signOut());
        }
      }

      if (refreshToken) {
        if (refreshToken !== 'remove') {
          await AsyncStorage.setItem('@refreshToken', refreshToken);
        } else {
          await AsyncStorage.removeItem('@refreshToken');
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
