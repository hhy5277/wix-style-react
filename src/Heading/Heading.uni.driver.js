import {
  baseUniDriverFactory,
  StylableUnidriverUtil,
  ReactBase,
} from '../../test/utils/unidriver';

import style from './Heading.st.css';

export const headingUniDriverFactory = base => {
  const stylableUnidriverUtil = new StylableUnidriverUtil(style);
  const reactBase = ReactBase(base);

  return {
    ...baseUniDriverFactory(base),
    /**
     * Get text content
     * @ReactDOMOnly
     * */
    getText: () => reactBase.innerHtml(),
    /**
     * Get appearance
     * @ReactDOMOnly
     * @return 'H1' | 'H2' | ...
     * */
    getAppearance: () =>
      stylableUnidriverUtil.getStyleState(base, 'appearance'),
    /**
     * Get light (boolean)
     * @return boolean
     * @ReactDOMOnly
     * */
    isLight: () => stylableUnidriverUtil.hasStyleState(base, 'light'),
  };
};
