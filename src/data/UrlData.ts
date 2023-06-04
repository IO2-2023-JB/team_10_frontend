import axios from 'axios';
import { atom } from 'recoil';
import { DEFAULT_BACKEND_URL } from '../const';

export const backendUrlState = atom<string>({
  key: 'backendUrlState',
  default: DEFAULT_BACKEND_URL,
  effects: [
    ({ onSet }) => {
      onSet((newUrl) => {
        axios.defaults.baseURL = newUrl;
      });
    },
  ],
});
