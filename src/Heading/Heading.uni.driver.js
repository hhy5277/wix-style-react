import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const headingUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
  };
};
