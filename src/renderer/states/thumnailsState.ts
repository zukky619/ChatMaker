import { atom } from 'recoil';

export const thumnailsState = atom({
  key: 'thumnailsState',
  default: {} as { [key: string]: string | undefined },
});
