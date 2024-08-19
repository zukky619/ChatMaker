import React from 'react';
import LeftChatVoice from './ChatVoice';
import ChatIcon from './ChatIcon';
import { MessageInfo } from '../types/messageInfo';
import ChatLineStyle from './ChatLine.module.css';

type Props = {
  message: MessageInfo;
};

const ChatLine = (props: Props) => {
  return (
    <div
      className={`${ChatLineStyle.line} ${props.message.from == 'me' && ChatLineStyle.myline}`}
    >
      <ChatIcon message={props.message} />
      <LeftChatVoice message={props.message} />
    </div>
  );
};

export default ChatLine;
