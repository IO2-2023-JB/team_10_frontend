import { atom } from 'recoil';
import { MODE_DURATION } from '../const';

export enum AppModes {
  Standard,
  Papiesz,
  Green,
}

export const appModeState = atom<AppModes>({
  key: 'appModeState',
  default: AppModes.Standard,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newState) => {
        if (newState !== AppModes.Standard)
          setTimeout(() => {
            setSelf(AppModes.Standard);
          }, MODE_DURATION);
      });
    },
  ],
});
