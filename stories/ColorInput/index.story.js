import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  liveCode as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import testkit from '!raw-loader!./README.TESTKIT.md';
import ColorInput from 'wix-style-react/ColorInput';
import { placements } from 'wix-style-react/Popover';
import { baseScope } from '../utils/Components/LiveCodeExample';

import usage from '!raw-loader!./Usage.md';
import * as examples from './examples';
import styles from './examples.scss';

const baseProps = {
  autoRender: false,
  previewProps: {
    className: styles.livePreview,
  },
};

const liveCode = config =>
  baseLiveCode({ components: { ...baseScope }, ...baseProps, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), liveCode({ compact: true, source })],
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../../src/ColorInput/ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onConfirm: value => setState({ value }),
    size: 'medium',
    error: false,
    errorMessage: '',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    disabled: false,
  }),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
    popoverPlacement: [...placements],
    popoverAppendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <ColorInput value="#FF0000" popoverAppendTo="window" />
        </div>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/ColorInput/ColorInput.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    tabs({
      tabs: [
        tab({
          title: 'Description',
          sections: [
            description({
              text:
                '🎨 A component that lets user enter hex color or select it from color pallete.',
            }),

            importExample({
              source: "import ColorInput from 'wix-style-react/ColorInput';",
            }),

            divider(),

            description({
              title: 'Usage',
              text: usage,
            }),

            columns({
              items: [
                description({
                  text: '### Examples',
                }),
                description(),
              ],
            }),

            ...[
              {
                title: 'Plain Example',
                text: 'Example shows how to use component.',
                source: examples.basicExample,
              },
              {
                title: 'Size',
                text:
                  'ColorInput supports `small`, `medium` and `large` sizes.',
                source: examples.sizes,
              },

              {
                title: 'Error, Null and Disabled',
                text: 'ColorInput has `error`, `null` and `disabled` states.',
                source: examples.states,
              },
            ].map(example),
          ],
        }),

        tab({
          title: 'API',
          sections: [api()],
        }),

        tab({
          title: 'Testkit',
          sections: [description({ text: testkit })],
        }),

        tab({
          title: 'Playground',
          sections: [playground()],
        }),
      ],
    }),
  ],
};
