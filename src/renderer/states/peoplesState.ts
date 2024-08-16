import { atom } from 'recoil';
import { peopleInfo } from '../types/peopleInfo';

export const peoplesState = atom({
  key: 'peoplesState',
  default: [
    {
      id: 'me',
      voiceColor: '#ffffff',
    },
    {
      id: 'A',
      voiceColor: '#ffffff',
    },
  ] as peopleInfo[],
});
