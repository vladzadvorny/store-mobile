import { Platform } from 'react-native';

export const languages = ['en', 'ru', 'fr', 'es', 'de', 'ar', 'ko'];
export const types = ['bot', 'channel', 'group', 'sticker'];

let url;
if (__DEV__) {
  url =
    Platform.OS === 'android'
      ? 'http://10.0.3.2:3001/graphql'
      : 'http://localhost:3001/graphql';
} else {
  url = 'http://google.com';
}
export const uri = url;

export const filesUrl = 'http://localhost:3001/images';
