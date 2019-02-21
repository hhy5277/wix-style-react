import { uniTestkitFactoryCreator } from 'wix-ui-test-utils/vanilla';

import { textUniDriverFactory } from '../src/Text/Text.uni.driver';
import { headingUniDriverFactory } from '../src/Heading/Heading.uni.driver';

export const textTestkitFactory = uniTestkitFactoryCreator(
  textUniDriverFactory,
);
export const headingTestkitFactory = uniTestkitFactoryCreator(
  headingUniDriverFactory,
);
