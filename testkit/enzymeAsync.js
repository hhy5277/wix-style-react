import { enzymeUniTestkitFactoryCreator } from 'wix-ui-test-utils/enzyme';

import { textUniDriverFactory } from '../src/Text/Text.uni.driver';
import { headingUniDriverFactory } from '../src/Heading/Heading.uni.driver';

export const textTestkitFactory = enzymeUniTestkitFactoryCreator(
  textUniDriverFactory,
);
export const headingTestkitFactory = enzymeUniTestkitFactoryCreator(
  headingUniDriverFactory,
);
