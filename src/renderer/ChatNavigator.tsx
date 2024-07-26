import React, { useState } from 'react';
import ChatView from './ChatView';
import ChatEditor from './ChatEditor';
import { fetch_voicebox } from './apis/voicebox';
import { sleep, voicebox_res_play } from './utils/utils';
import { MessageInfo } from './types/messageInfo';
import ChatNavigatorStyle from './ChatNavigator.module.css';
import { useRecoilState } from 'recoil';
import { messagesState } from './states/messagesState';

const ChatNavigator = () => {
  const [index, setIndex] = useState<number>(0);
  const [messages, setMessages] = useRecoilState(messagesState);
  // const [messages, setMessages] = useState<MessageInfo[]>([
  //   {
  //     id: 1,
  //     message: 'ちゃみんぐ！！！',
  //     from: 'me',
  //   },
  //   {
  //     id: 2,
  //     message: 'おもろいね',
  //     from: 'A',
  //   },
  //   {
  //     id: 3,
  //     message: 'いろはにほへとちりぬるを、新しい朝が来た',
  //     from: 'me',
  //   },
  //   {
  //     id: 4,
  //     message: 'ゆうかさん、かわいいね、おめめがとってもチャーミング',
  //     from: 'B',
  //   },
  //   {
  //     id: 5,
  //     message: 'ちゃみんぐ！！！',
  //     from: 'me',
  //   },
  //   {
  //     id: 6,
  //     message: 'おもろいね',
  //     from: 'A',
  //   },
  //   {
  //     id: 7,
  //     message: 'いろはにほへとちりぬるを、新しい朝が来た',
  //     from: 'me',
  //   },
  //   {
  //     id: 8,
  //     message: 'ゆうかさん、かわいいね、おめめがとってもチャーミング',
  //     from: 'B',
  //   },
  //   {
  //     id: 9,
  //     message: 'ちゃみんぐ！！！',
  //     from: 'me',
  //   },
  //   {
  //     id: 10,
  //     message: 'おもろいね',
  //     from: 'A',
  //   },
  //   {
  //     id: 11,
  //     message: 'いろはにほへとちりぬるを、新しい朝が来た',
  //     from: 'me',
  //   },
  //   {
  //     id: 12,
  //     message: 'ゆうかさん、かわいいね、おめめがとってもチャーミング',
  //     from: 'B',
  //   },
  // ]);

  const startDraw = async () => {
    setIndex(0);
    let i = 0;

    let voices = [];

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
      setIndex(i);
      await voicebox_res_play(voice);
    }
  };

  const showIndex = () => {
    console.log('index=', index);
    setIndex(0);
  };

  return (
    <div className={ChatNavigatorStyle.content}>
      <ChatView messages={messages} index={index} />
      <ChatEditor start={startDraw} />
    </div>
  );
};

export default ChatNavigator;
