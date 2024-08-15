import { atom } from 'recoil';
import { peopleInfo } from '../types/peopleInfo';

export const peoplesState = atom({
  key: 'peoplesState',
  default: [
    {
      id: 'me',
      voiceColor: 'white',
    },
    {
      id: 'A',
      voiceColor: 'white',
    },
  ] as peopleInfo[],
});
