import React, { useState, useEffect, useRef } from 'react';
import ChatLine from './modules/ChatLine';
import { MessageInfo } from './types/messageInfo';
import ChatViewStyle from './ChatView.module.css';
import { useRecoilState } from 'recoil';
import { messagesIndexState } from './states/messageIndexState';
import { chatState } from './states/chatState';

type Props = {
  messages: MessageInfo[];
};

const ChatView = (props: Props) => {
  const [messageIndex, setMessageIndex] = useRecoilState(messagesIndexState);
  const [chatStatus, setChatStatus] = useRecoilState(chatState);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageIndex]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          backgroundColor: 'darkslategray',
          width: '56.25vh',
          height: '100vh',
          overflow: 'auto',
          overflowY: chatStatus === 'paused' ? 'hidden' : 'auto',
        }}
      >
        {props.messages
          .filter((value) => {
            return value.id <= messageIndex;
          })
          .map((message) => (
            <ChatLine key={message.id} message={message} />
          ))}
      </div>
    </>
  );
};

export default ChatView;
