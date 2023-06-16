import { atom } from 'recoil';
import { MODE_DURATION } from '../const';

export enum AppMode {
  Standard,
  Papiesz,
  Green,
}

export interface AppModeData {
  appMode: AppMode;
  timeout: NodeJS.Timeout | null;
}

export const appModeState = atom<AppModeData>({
  key: 'appModeState',
  default: { appMode: AppMode.Standard, timeout: null } as AppModeData,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newState, oldState) => {
        if (newState.appMode !== AppMode.Standard) {
          if ((oldState as AppModeData).timeout !== null)
            clearTimeout((oldState as AppModeData).timeout!);
          const timeout = setTimeout(() => {
            setSelf({ appMode: AppMode.Standard, timeout: null });
          }, MODE_DURATION);
          setSelf({ appMode: newState.appMode, timeout: timeout });
        }
      });
    },
  ],
});
