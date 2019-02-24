import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';

const RichTextToolbar = ({ editorState, onBold }) => {
  const toggleStyle = (event, styleCallback, styleName) => {
    event.preventDefault();
    styleCallback(RichUtils.toggleInlineStyle(editorState, styleName));
  };

  return (
    <div>
      <button onClick={event => toggleStyle(event, onBold, 'BOLD')}>B</button>
    </div>
  );
};

export default RichTextToolbar;
