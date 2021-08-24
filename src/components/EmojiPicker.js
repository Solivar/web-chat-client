import React from 'react';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const EmojiPicker = ({ handleEmoji, isOpen }) => {
  const addEmoji = emoji => {
    handleEmoji(emoji);
  };

  return (
    <div
      style={isOpen ? { height: 'auto', margin: '0.75rem 0' } : { height: 0, overflow: 'hidden' }}
    >
      <Picker onSelect={addEmoji} color="#00D1B2" showPreview={false} title="" />
    </div>
  );
};

export default EmojiPicker;
