import React from 'react';
import headingDriverFactory from './Heading.driver';
import Heading from './Heading';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

describe('Heading', () => {
  const createDriver = createDriverFactory(headingDriverFactory);

  describe('light prop', () => {
    it('should be dark by default', () => {
      const wrapper = createDriver(<Heading>Hello</Heading>);
      expect(wrapper.isLight()).toBe(false);
    });

    it('should be light', () => {
      const wrapper = createDriver(<Heading light>Hello</Heading>);
      expect(wrapper.isLight()).toBe(true);
    });
  });
});
