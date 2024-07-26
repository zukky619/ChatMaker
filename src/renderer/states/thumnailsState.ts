import { atom } from 'recoil';

export const thumnailsState = atom({
  key: 'thumnailsState',
  default: [] as { name: string; image: string }[],
});
