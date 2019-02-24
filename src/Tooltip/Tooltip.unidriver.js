import { ReactBase } from '../../test/utils/unidriver/ReactBase';
import eventually from '../../test/utils/eventually';

const arrowDirection = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export const teskitTooltip = (base, body) => {
  const getContentRoot = async () => {
    const contentRootHook = await base.attr('data-content-hook');
    return body.$(`[data-hook="${contentRootHook}"]`);
  };

  const hasContentClassName = async cls =>
    new RegExp(cls).test(
      await (await getContentRoot()).$('.tooltip').attr('class'),
    );

  const getArrowPlacement = async () => {
    const classes = await (await getContentRoot())
      .$('[data-hook="tooltip-arrow"]')
      .attr('class');

    return arrowDirection[classes.split(' ')[2]];
  };

  const hoverAndGetContent = async (timeout, interval) => {
    await base.hover(base);
    return eventually(
      async () => {
        if (!(await getContentRoot()).exists()) {
          throw new Error('Tooltip not visible');
        }
        const content = await (await getContentRoot()).$('.tooltip').text();
        await ReactBase(base).mouseLeave();
        return content;
      },
      {
        timeout,
        interval,
      },
    );
  };

  const getContentStyleValue = async value => {
    const style = await (await getContentRoot()).$('.tooltip').attr('style');
    return style.includes(value)
      ? style
          .split(';')
          .find(css => new RegExp(value).test(css))
          .replace(`${value}: `, '')
          .replace(' ', '')
      : undefined;
  };

  return {
    click: async () => await base.click(),
    focus: async () => await ReactBase(base).focus(),
    blur: async () => await ReactBase(base).blur(),
    isShown: async () => (await getContentRoot()).exists(),
    getTooltipWrapper: async () =>
      await (await getContentRoot()).$('.tooltip').getNative(),
    mouseEnter: async () => await base.hover(base),
    mouseLeave: async () => await ReactBase(base).mouseLeave(),
    hasErrorTheme: async () => await hasContentClassName('error'),
    hasDarkTheme: async () => await hasContentClassName('dark'),
    hasLightTheme: async () => await hasContentClassName('light'),
    hasAnimationClass: async () =>
      await (await getContentRoot()).$('.fadeIn').exists(),
    getChildren: async () => await base.text(),
    getContent: async () => await (await getContentRoot()).$('.tooltip').text(),
    getPlacement: async () => await getArrowPlacement(),
    getMaxWidth: async () => await getContentStyleValue('max-width'),
    getMinWidth: async () => await getContentStyleValue('min-width'),
    getAlignment: async () => await getContentStyleValue('text-align'),
    getPadding: async () => await getContentStyleValue('padding'),
    hasArrow: async () =>
      await (await getContentRoot()).$('[data-hook="tooltip-arrow"]').exists(),
    getContentHook: async () =>
      await body
        .$(`[data-hook="${await base.attr('data-content-hook')}"]`)
        .getNative(),
    hoverAndGetContent: async ({ timeout = 1000, interval = 50 } = {}) =>
      await hoverAndGetContent(timeout, interval),
  };
};
