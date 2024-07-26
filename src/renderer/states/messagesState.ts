import { atom } from 'recoil';
import { MessageInfo } from '../types/messageInfo';

export const messagesState = atom({
  key: 'messagesState',
  default: [] as MessageInfo[],
});
