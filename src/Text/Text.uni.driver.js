import {
  baseUniDriverFactory,
  StylableUnidriverUtil,
  ReactBase,
} from '../../test/utils/unidriver';

import style from './Text.st.css';

export const textUniDriverFactory = base => {
  const stylableUtil = new StylableUnidriverUtil(style);
  const reactBase = ReactBase(base);

  return {
    ...baseUniDriverFactory(base),
    /** @ReactDOMOnly */
    getTagName: async () => (await reactBase.tagName()).toLowerCase(),
    /** @ReactDOMOnly */
    getText: () => reactBase.innerHtml(),
    getSize: () => stylableUtil.getStyleState(base, 'size'),
    getSkin: () => stylableUtil.getStyleState(base, 'skin'),
    getWeight: () => stylableUtil.getStyleState(base, 'weight'),
    isLight: () => stylableUtil.hasStyleState(base, 'light'),
    isSecondary: () => stylableUtil.hasStyleState(base, 'secondary'),
  };
};
