import { Simulate } from 'react-dom/test-utils';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base, document) {
  const htmlElement = () => {
    if (base.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return base.getNative();
  };

  return {
    pressKey: async key => Simulate.keyDown(await htmlElement(), { key }),
    tagName: async () => (await htmlElement()).tagName,
    tabIndex: async () => (await htmlElement()).tabIndex,
    readOnly: async () => (await htmlElement()).readOnly,
    innerHtml: async () => (await htmlElement()).innerHTML,
    focus: async () => (await htmlElement()).focus(),
    isFocus: async () => {
      return (await document.getNative()).activeElement === (await htmlElement());
    },
    blur: async () => Simulate.blur(await htmlElement()),
    keyup: async () => Simulate.keyUp(await htmlElement()),
    keydown: async (key) => Simulate.keyDown(await htmlElement(), key),
    paste: async () => Simulate.paste(await htmlElement()),
    required: async () => (await htmlElement()).required,
    defaultValue: async () => (await htmlElement()).defaultValue,
    textContent: async () => (await htmlElement()).textContent,
    selectionStart: async () => (await htmlElement()).selectionStart,
    getStyle: async () => (await htmlElement()).style
  };
}
