import React from 'react';
import { MessageInfo } from '../types/messageInfo';
import ChatVoiceStyle from './ChatVoice.module.css';

type Props = {
  message: MessageInfo;
};

const ChatVoice = (props: Props) => {
  return (
    <div
      className={
        props.message.from == 'me'
          ? ChatVoiceStyle.myvoice
          : ChatVoiceStyle.yourvoice
      }
    >
      <p>{props.message.message}</p>
    </div>
  );
};

export default ChatVoice;
