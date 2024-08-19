import React, { useState, useRef } from 'react';
import { fetch_voicebox } from './apis/voicebox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { messagesState } from './states/messagesState';
import { thumnailsState } from './states/thumnailsState';
import { messagesIndexState } from './states/messageIndexState';
import { chatState } from './states/chatState';
import { peoplesState } from './states/peoplesState';
import PeopleSelector from './modules/PeopleSelector';

import videoButtons from 'assets/video_buttons.png';

type Props = {
  start: () => void;
};

const ChatEditor = (props: Props) => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [thumnails, setThumnails] = useRecoilState(thumnailsState);
  const [peoples, setPeoples] = useRecoilState(peoplesState);
  const [messageIndex, setMessageIndex] = useRecoilState(messagesIndexState);
  const [chatStatus, setChatStatus] = useRecoilState(chatState);

  const click_handler = async () => {
    console.log(thumnails);
  };

  const open_file = async () => {
    window.electron.ipcRenderer.once('open-csv', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      setMessages(arg);
      setMessageIndex(arg.length);
    });
    window.electron.ipcRenderer.sendMessage('open-csv', []);
  };

  const save_movie = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 1080,
          height: 1920,
          frameRate: 30,
        },
      })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.download = 'movie.webm';
          a.href = url;
          a.click();
          window.URL.revokeObjectURL(url);
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100vw - 56.25vh)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={props.start}
          style={{
            borderRadius: '1000px',
            border: 'gray 1px solid',
          }}
        >
          <div
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '300px',
              backgroundSize: '900px',
              backgroundPosition: '-276px -18px',
              backgroundImage: `url(${videoButtons})`,
            }}
          />
        </button>
        <button
          onClick={save_movie}
          style={{
            borderRadius: '1000px',
            border: 'gray 1px solid',
            width: '64px',
            height: '64px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '300px',
              backgroundSize: '450px',
              backgroundPosition: '-248px -9px',
              backgroundImage: `url(${videoButtons})`,
            }}
          />
        </button>
        <button onClick={open_file}>ファイルを開く</button>
      </div>
      <div>
        <label>People Settings</label>
      </div>
      <div>
        <PeopleSelector peoples={peoples} />
      </div>
    </div>
  );
};

export default ChatEditor;
