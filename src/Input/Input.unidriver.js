import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import styles from './Input.scss';
import { ReactBase } from '../../test/utils/unidriver';

export const testkit = (base,body,document) => {
  const input = base.$('input');

  const reactBase = ReactBase(base, document);

  const reactBaseInput = ReactBase(input, document);

  const driver = {
    ...baseUniDriverFactory(base),
    getInputElementClasses: async () => await input.attr('class'),
    suffixComponentExists: async className =>
      await base.$(`.${styles.suffix} ${className}`),
    getRootElementClasses: async () => await base.attr('class'),
    getAriaDescribedby: async () => await input.attr('aria-describedby'),
    getAriaLabel: async () => await input.attr('aria-label'),
    getName: async () => await input.attr('name'),
    getType: async () => await input.attr('type'),
    getAriaControls: async () => await input.attr('aria-controls'),
    clickIconAffix: async () => await base.$(`[data-hook="icon-affix"]`).click(),
    clickCustomAffix: async () => await base.$(`[data-hook="custom-affix"]`).click(),
    isMenuArrowLast: async () => {
      const selector = `.${styles.suffixes} .${styles.suffix}:last-child > .${
        styles.menuArrow
      }`;
      return (await base.$$(selector).count()) === 1;
    },
    hasSuffixesClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withSuffixes}`).count()) === 1,
    hasSuffixClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withSuffix}`).count()) === 1,
    hasSuffix: async () => await base.$(`.${styles.suffix}`).exists(),
    hasPrefixClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withPrefix}`).count()) === 1,
    prefixComponentExists: async style =>
      (await base.$$(`.${styles.prefix} ${style}`).count()) === 1,
    hasPrefix: async () => (await base.$$(`.${styles.prefix}`).count()) === 1,
    hasClearButton: async () => await base.$(`[data-hook=input-clear-button]`).exists(),
    clickClear: async () => await base.$(`[data-hook=input-clear-button]`).click(),
    getValue: async () => await input.value(),
    isOfStyle: async style =>
      (await driver.getRootElementClasses()).indexOf(
        styles[`theme-${style}`],
      ) !== -1,
    isDisabled: async () =>
      (await driver.getRootElementClasses()).indexOf(styles.disabled) !== -1,
    isHoveredStyle: async () =>
      (await driver.getRootElementClasses()).indexOf(styles.hasHover) !== -1,
    isFocusedStyle: async () =>
      (await driver.getRootElementClasses()).indexOf(styles.hasFocus) !== -1,
    getRequired: async () => await reactBaseInput.required(),
    enterText: async value => await input.enterValue(value),
    getAutocomplete: async () => await input.attr('autocomplete'),
    getDefaultValue: async () => await reactBaseInput.defaultValue(),
    getUnit: async () => await reactBase.textContent(),
    getTabIndex: async () => await reactBaseInput.tabIndex(),
    getReadOnly: async () => await reactBaseInput.readOnly(),
    getTextOverflow: async () =>
      (await input.getNative()).style['text-overflow'],
    hasExclamation: async () => await base.$(`.${styles.exclamation}`).exists(),
    hasClass: async className =>
      (await base.attr('class')).indexOf(className) !== -1,
    hasError: async () => await driver.hasClass(styles.hasError),
    hasLoader: async () =>
      (await base.$$(`.${styles.loaderContainer}`).count()) > 0,
    focus: async () => await reactBaseInput.focus(),
    blur: async () => await reactBaseInput.blur(),
    keyUp: async () => await reactBaseInput.keyup(),
    keyDown: async () => await reactBaseInput.keydown(),
    paste: async () => await reactBaseInput.paste(),
    trigger: async (value, event) => {
      if (value === 'focus') {
        return await driver.focus();
      }
      if (value === 'blur') {
        return await driver.blur();
      }
      if (value === 'keyUp') {
        return await driver.keyUp();
      }
      if (value === 'keyDown') {
        return await driver.keyDown(event);
      }
      if (value === 'paste') {
        return await driver.paste();
      }
      if (value === 'change') {
        return await driver.enterText(value);
      }
    },
    isFocus: async () => await reactBaseInput.isFocus(),
    hasHelp: async () => await base.$(`.${styles.help}`).exists(),
    clickUnit: async () => await base.$(`.${styles.unit}`).click(),
    hasMagnifyingGlass: async () =>
      await base.$(`.${styles.magnifyingGlass}`).exists(),
    clickMagnifyingGlass: async () =>
      await base.$(`.${styles.magnifyingGlass}`).click(),
    clickMenuArrow: async () => await base.$(`.${styles.menuArrow}`).click(),
    hasMenuArrow: async () => await base.$(`.${styles.menuArrow}`).exists(),
    isNarrowError: async () => await base.$(`.${styles.narrow}`).exists(),
    isRTL: async () => await driver.hasClass(styles.rtl),
    getCursorLocation: async () => await reactBaseInput.selectionStart(),
  };

  return driver;
};
