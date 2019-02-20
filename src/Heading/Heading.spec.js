import React from 'react';
import headingDriverFactory from './Heading.driver';
import Heading from './Heading';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

describe('Heading', () => {
  const createDriver = createDriverFactory(headingDriverFactory);

  describe('light prop', () => {
    it('should be dark by default', async () => {
      const driver = createDriver(<Heading>Hello</Heading>);
      expect(await driver.isLight()).toBe(false);
    });

    it('should be light', async () => {
      const driver = createDriver(<Heading light>Hello</Heading>);
      expect(await driver.isLight()).toBe(true);
    });
  });
});
