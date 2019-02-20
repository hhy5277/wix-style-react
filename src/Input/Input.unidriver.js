import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const testkit = base => {
  return {
    ...baseUniDriverFactory(base),
  };
};
