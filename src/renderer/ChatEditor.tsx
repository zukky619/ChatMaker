import React, { useState, useRef } from 'react';
import { fetch_voicebox } from './apis/voicebox';
import { useRecoilState } from 'recoil';
import { messagesState } from './states/messagesState';
import ImageRegister from './modules/ImageRegister';

type Props = {
  start: () => void;
};

const ChatEditor = (props: Props) => {
  const [messages, setMessages] = useRecoilState(messagesState);

  const click_handler = async () => {
    const fetched_res = fetch_voicebox('こんにちは', 'man');

    fetched_res.then((arrayBuffer) => {
      // Blobに変換
      const audioBlob = new Blob([arrayBuffer], { type: 'audio/x-wav' });
      // URLに変換
      const audioUrl = URL.createObjectURL(audioBlob);
      // 音声作成
      const audio = new Audio(audioUrl);
      // 音量[0-1]設定
      audio.volume = 1;
      // 再生
      audio.play();
    });
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
      </div>
    </>
  );
};

export default ChatEditor;
