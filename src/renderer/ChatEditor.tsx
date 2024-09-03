import React, { useState, useRef } from 'react';
import { fetch_voicebox } from './apis/voicebox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { messagesState } from './states/messagesState';
import { thumnailsState } from './states/thumnailsState';
import { messagesIndexState } from './states/messageIndexState';
import { chatState } from './states/chatState';
import { peoplesState } from './states/peoplesState';
import PeopleSelector from './modules/PeopleSelector';
import styled from 'styled-components';

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

  const save_config = async () => {
    window.electron.ipcRenderer.once('save-config', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
    });
    window.electron.ipcRenderer.sendMessage('save-config', {
      messages: messages,
      thumnails: thumnails,
      peoples: peoples,
      messageIndex: messageIndex,
      chatStatus: chatStatus,
    });
  };

  const load_config = async () => {
    window.electron.ipcRenderer.once('load-config', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      setMessages(arg.messages);
      setThumnails(arg.thumnails);
      setPeoples(arg.peoples);
      setMessageIndex(arg.messageIndex);
      setChatStatus(arg.chatStatus);
    });
    window.electron.ipcRenderer.sendMessage('load-config', []);
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
        <GenButton onClick={open_file}>Load Script</GenButton>
        {/* <button
          onClick={open_file}
          style={{
            // background: '#eee',
            borderColor: '#eee',
            borderRadius: '10px',
            position: 'relative',
            // display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // margin: '0 auto',
            // maxWidth: '160px',
            padding: '10px 25px',
            // fontFamily: 'Noto Sans Japanese',
            // lineHeight: 1.8,
            // textDecoration: 'none',
            color: '#313131',
            transition: '0.3s ease-in-out',
            // fontWeight: 500,
          }}
        >
          Open File
        </button> */}
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
      </div>
      <div>
        <label>People Settings</label>
      </div>
      <div>
        <PeopleSelector peoples={peoples} />
      </div>
      <div>
        <label>General Settings</label>
      </div>
      <div style={{ display: 'flex', margin: '10px', gap: '10px' }}>
        <GenButton onClick={save_config}>Save Settings</GenButton>
        <GenButton onClick={load_config}>Load Settings</GenButton>
        {/* <GenButton
          onClick={() => {
            let synthetizer = new SpeechSynthesisUtterance();
            synthetizer.text = 'こんにちは';
            synthetizer.lang = 'ja-JP';
            synthetizer.voice = speechSynthesis.getVoices()[0];
            speechSynthesis.speak(synthetizer);
          }}
        >
          Clear Messages
        </GenButton> */}
      </div>
    </div>
  );
};

export default ChatEditor;

const GenButton = styled.button`
  background: #eee;
  border: 1px solid #eee;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 160px;
  padding: 10px 25px;
  font-family: 'Noto Sans Japanese';
  line-height: 1.8;
  text-decoration: none;
  color: #313131;
  transition: 0.3s ease-in-out;
  font-weight: 500;
  &:hover {
    background: #ddd;
    border-color: #ddd;
  }
`;
