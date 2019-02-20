import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil } from '../../test/utils/unidriver/StylableUnidriverUtil';
import style from './Heading.st.css';

export const headingUniDriverFactory = base => {
  const stylableUnidriverUtil = new StylableUnidriverUtil(style);
  return {
    ...baseUniDriverFactory(base),
    isLight: () => stylableUnidriverUtil.hasStyleState(base, 'light'),
  };
};
