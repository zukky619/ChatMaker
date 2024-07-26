import React from 'react';
import { MessageInfo } from '../types/messageInfo';
import ChatIconStyle from './ChatIcon.module.css';

type Props = {
  message: MessageInfo;
};

const ChatIcon = (props: Props) => {
  return (
    <div
      className={`${ChatIconStyle.icon} ${props.message.from === 'me' ? ChatIconStyle.myicon : ChatIconStyle.youricon}`}
    >
      {/* {props.from} */}
    </div>
  );
};

export default ChatIcon;
