import { atom } from 'recoil';

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
          }, 60000);
      });
    },
  ],
});
