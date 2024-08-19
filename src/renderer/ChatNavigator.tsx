import React, { useState } from 'react';
import ChatView from './ChatView';
import ChatEditor from './ChatEditor';
import { fetch_voicebox } from './apis/voicebox';
import { voicebox_res_play } from './utils/utils';
import ChatNavigatorStyle from './ChatNavigator.module.css';
import { useRecoilState } from 'recoil';
import { messagesState } from './states/messagesState';
import { messagesIndexState } from './states/messageIndexState';
import { chatState } from './states/chatState';

const ChatNavigator = () => {
  const [messageIndex, setMessageIndex] = useRecoilState(messagesIndexState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [chatStatus, setChatStatus] = useRecoilState(chatState);

  const startDraw = async () => {
    setChatStatus('playing');
    setMessageIndex(0);
    let i = 0;

    let voices = [];

    try {
      for (const message of messages) {
        const fetched_res = fetch_voicebox(message.message, 'man');
        const audioArray = await fetched_res;
        voices.push(audioArray);
      }
      console.log(voices);

      //voicesでforループを回す
      for (const voice of voices) {
        console.log(i);
        i += 1;
        setMessageIndex(i);
        await voicebox_res_play(voice);
      }
    } catch (error) {
      console.log(error);
    }
    setChatStatus('paused');
  };

  const showIndex = () => {
    console.log('index=', messageIndex);
    setMessageIndex(0);
  };

  return (
    <div className={ChatNavigatorStyle.content}>
      <ChatView messages={messages} />
      <ChatEditor start={startDraw} />
    </div>
  );
};

export default ChatNavigator;
