import { Simulate } from 'react-dom/test-utils';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} nativePromise
 */
export function ReactBase(nativePromise) {
  const htmlElement = () => {
    if (nativePromise.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return nativePromise.getNative();
  };

  return {
    pressKey: async key => Simulate.keyDown(await htmlElement(), { key }),
    tagName: async () => (await htmlElement()).tagName,
    innerHtml: async () => (await htmlElement()).innerHTML,
  };
}
