import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil } from '../../test/utils/unidriver/StylableUnidriverUtil';
import style from './Text.st.css';
import textDriverFactory from './Text.driver';
import { delegateToReactDOM } from '../../test/utils/unidriver/delegatMethod';

export const textUniDriverFactory = base => {
  const stylableUtil = new StylableUnidriverUtil(style);

  return {
    ...baseUniDriverFactory(base),
    getTagName: () => delegateToReactDOM(base, 'getTagName', textDriverFactory),
    getText: () => delegateToReactDOM(base, 'getText', textDriverFactory),
    getSize: () => stylableUtil.getStyleState(base, 'size'),
    getSkin: () => stylableUtil.getStyleState(base, 'skin'),
    getWeight: () => stylableUtil.getStyleState(base, 'weight'),
    isLight: () => stylableUtil.hasStyleState(base, 'light'),
    isSecondary: () => stylableUtil.hasStyleState(base, 'secondary'),
  };
};
