import { atom } from 'recoil';
import axios from 'axios';
import { UserDetails } from '../types/UserTypes';

export const userDetailsState = atom<UserDetails | null>({
  key: 'UserDetails',
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((updatedState) => {
        if (updatedState !== null) {
          localStorage.setItem('bearerToken', updatedState.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${updatedState.token}`;
        } else {
          localStorage.removeItem('bearerToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      });
    },
  ],
});
