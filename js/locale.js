import { initialize, addTranslation } from 'react-localize-redux';
import { AsyncStorage } from 'react-native';
import { getLanguages } from 'react-native-i18n';

import globalTranslation from '../assets/global';
import { languages } from './config';

export const getStorageLocale = async () => {
  const init = { interface: 'en', products: ['en'] };

  let storage;
  try {
    storage = await AsyncStorage.getItem('@locale');
  } catch (error) {
    storage = null;
  }

  if (!storage) return init;
  try {
    storage = JSON.parse(storage);
  } catch (error) {
    return init;
  }
  return storage;
};

export const setStorageLocale = async obj => {
  await AsyncStorage.setItem('@locale', JSON.stringify(obj));
};

export default async store => {
  let locale;
  try {
    [locale] = await getLanguages();
  } catch (error) {
    locale = 'en';
  }

  locale = languages.indexOf(locale) === -1 ? languages[0] : locale;

  let storage;
  storage = getStorageLocale();
  if ('interface' in storage) {
    storage =
      languages.indexOf(storage.interface) === -1 ? null : storage.interface;
  } else {
    storage = null;
  }

  store.dispatch(
    initialize(languages, {
      defaultLanguage: storage || locale
    })
  );
  store.dispatch(addTranslation(globalTranslation));
};
