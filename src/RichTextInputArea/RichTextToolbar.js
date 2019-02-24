import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RichUtils } from '@wix/draft-js';

import styles from './RichTextToolbar.scss';
import TextAreaBold from '../new-icons/system/TextAreaBold';
import TextAreaItalic from '../new-icons/system/TextAreaItalic';
import TextAreaUnderline from '../new-icons/system/TextAreaUnderline';

const RichTextToolbar = ({
  className,
  editorState,
  onBold,
  onItalic,
  onUnderline,
}) => {
  const buttons = [
    {
      toggledStyle: 'BOLD',
      onClick: onBold,
      icon: TextAreaBold,
    },
    {
      toggledStyle: 'ITALIC',
      onClick: onItalic,
      icon: TextAreaItalic,
    },
    {
      toggledStyle: 'UNDERLINE',
      onClick: onUnderline,
      icon: TextAreaUnderline,
    },
  ];

  const toggleStyle = (event, onClick, toggledStyle) => {
    event.preventDefault();
    onClick(RichUtils.toggleInlineStyle(editorState, toggledStyle));
  };

  return (
    <div className={classNames(className, styles.root)}>
      {buttons.map(button => {
        const { onClick, toggledStyle, icon: Icon } = button;

        return (
          <button
            className={styles.button}
            onClick={event => toggleStyle(event, onClick, toggledStyle)}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};

export default RichTextToolbar;
