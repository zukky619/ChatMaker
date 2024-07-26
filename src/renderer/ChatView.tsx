import React, { useState, useEffect, useRef } from 'react';
import ChatLine from './modules/ChatLine';
import { MessageInfo } from './types/messageInfo';
import ChatViewStyle from './ChatView.module.css';

type Props = {
  messages: MessageInfo[];
  index: number;
};

const ChatView = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [props.index]);

  return (
    <>
      <div className={ChatViewStyle.content} ref={containerRef}>
        {props.messages
          .filter((value) => {
            return value.id <= props.index;
          })
          .map((message) => (
            <ChatLine key={message.id} message={message} />
          ))}
      </div>
    </>
  );
};

export default ChatView;
