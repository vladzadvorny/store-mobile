import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';

import me from './me';
import nav from './nav';

export default combineReducers({
  locale,
  me,
  nav
});
