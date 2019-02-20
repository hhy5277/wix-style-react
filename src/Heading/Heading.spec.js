import React from 'react';
import headingDriverFactory from './Heading.driver';
import Heading from './Heading';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react';
import { headingUniDriverFactory } from './Heading.uni.driver';

describe('Heading', () => {
  afterEach(() => cleanup());

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(headingUniDriverFactory));
  });

  describe('[sync]', () => {
    runTests(createRendererWithDriver(headingDriverFactory));
  });

  function runTests(render) {
    it('should be dark by default', async () => {
      const { driver } = render(<Heading>Hello</Heading>);
      expect(await driver.isLight()).toBe(false);
    });

    it('should be light', async () => {
      const { driver } = render(<Heading light>Hello</Heading>);
      expect(await driver.isLight()).toBe(true);
    });
  }
});
