import React from 'react';
import playButtonStyle from './playButton.module.css';

const playButton = () => {
  return (
    <label className={playButtonStyle.video_play_pause}>
      <input type="checkbox" />
      <span></span>
    </label>
  );
};

export default playButton;
