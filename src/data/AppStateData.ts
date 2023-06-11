import { atom } from 'recoil';
import { MODE_DURATION } from '../const';

export enum AppMode {
  Standard,
  Papiesz,
  Green,
}

export const appModeState = atom<AppMode>({
  key: 'appModeState',
  default: AppMode.Standard,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newState) => {
        if (newState !== AppMode.Standard)
          setTimeout(() => {
            setSelf(AppMode.Standard);
          }, MODE_DURATION);
      });
    },
  ],
});
