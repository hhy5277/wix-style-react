import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';

const RichTextToolbar = ({ editorState, onBold, onItalic, onUnderline }) => {
  const toggleStyle = (event, styleCallback, styleName) => {
    event.preventDefault();
    styleCallback(RichUtils.toggleInlineStyle(editorState, styleName));
  };

  return (
    <div>
      <button onClick={event => toggleStyle(event, onBold, 'BOLD')}>B</button>
      <button onClick={event => toggleStyle(event, onItalic, 'ITALIC')}>
        I
      </button>
      <button onClick={event => toggleStyle(event, onUnderline, 'UNDERLINE')}>
        U
      </button>
    </div>
  );
};

export default RichTextToolbar;
