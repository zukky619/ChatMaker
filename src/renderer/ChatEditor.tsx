import React, { useState, useRef } from 'react';
import { fetch_voicebox } from './apis/voicebox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { messagesState } from './states/messagesState';
import { thumnailsState } from './states/thumnailsState';
import ImageRegister from './modules/ImageRegister';

type Props = {
  start: () => void;
};

const ChatEditor = (props: Props) => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [thumnails, setThumnails] = useRecoilState(thumnailsState);

  const click_handler = async () => {
    console.log(thumnails);
  };

  const open_file = async () => {
    window.electron.ipcRenderer.once('open-csv', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      setMessages(arg);
    });
    window.electron.ipcRenderer.sendMessage('open-csv', []);
  };

  return (
    <>
      <div>
        <button onClick={click_handler}>再生</button>
        <button onClick={props.start}>停止</button>
        <button onClick={open_file}>ファイルを開く</button>
      </div>
      <div>
        <ImageRegister person="me" />
        <ImageRegister person="A" />
      </div>
    </>
  );
};

export default ChatEditor;
