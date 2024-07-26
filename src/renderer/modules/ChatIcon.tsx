import React from 'react';
import { MessageInfo } from '../types/messageInfo';
import { useRecoilState } from 'recoil';
import { thumnailsState } from '../states/thumnailsState';
import ChatIconStyle from './ChatIcon.module.css';

type Props = {
  message: MessageInfo;
};

const ChatIcon = (props: Props) => {
  const [thumnails, setThumnails] = useRecoilState(thumnailsState);

  return (
    <div
      className={`${ChatIconStyle.icon} ${props.message.from === 'me' ? ChatIconStyle.myicon : ChatIconStyle.youricon}`}
    >
      {thumnails[props.message.from] ? (
        <img
          src={thumnails[props.message.from]}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: 100,
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ChatIcon;
