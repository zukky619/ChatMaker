import { atom } from 'recoil';

export const chatState = atom({
  key: 'chatState',
  default: 'paused' as 'playing' | 'paused',
});
