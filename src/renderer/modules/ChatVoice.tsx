import React from 'react';
import { MessageInfo } from '../types/messageInfo';
import { useRecoilState } from 'recoil';
import { peoplesState } from '../states/peoplesState';
import ChatVoiceStyle from './ChatVoice.module.css';
import styled from 'styled-components';

type Props = {
  message: MessageInfo;
  bgColor?: string;
};

const LeftChatVoice = (props: Props) => {
  return (
    <LeftVoiceComponent theme={{ bgColor: props.bgColor }}>
      <p>{props.message.message}</p>
    </LeftVoiceComponent>
  );
};

const RightChatVoice = (props: Props) => {
  return (
    <RightVoiceComponent theme={{ bgColor: props.bgColor }}>
      <p>{props.message.message}</p>
    </RightVoiceComponent>
  );
};

export const ChatVoice = (props: Props) => {
  const [peoples, setPeoples] = useRecoilState(peoplesState);

  let bgColor =
    props.bgColor ||
    peoples.find((people) => people.id === props.message.from)?.voiceColor;
  if (bgColor === undefined) {
    bgColor = '#ffffff';
  }

  if (props.message.from === 'me') {
    return <RightChatVoice message={props.message} bgColor={bgColor} />;
  } else {
    return <LeftChatVoice message={props.message} bgColor={bgColor} />;
  }
};

export default ChatVoice;

const LeftVoiceComponent = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 10px;
  margin-left: 60px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: ${(props) => props.theme.bgColor};

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 3px;
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid ${(props) => props.theme.bgColor};
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
  }
`;

const RightVoiceComponent = styled.div`
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 60px;

  p {
    display: inline-block;
    position: relative;
    padding: 8px;
    max-width: 250px;
    border-radius: 12px;
    background: ${(props) => props.theme.bgColor};
    font-size: 15px;
  }

  p:after {
    content: '';
    position: absolute;
    top: 3px;
    /* 右側の位置を調整 */
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid ${(props) => props.theme.bgColor};
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
`;
