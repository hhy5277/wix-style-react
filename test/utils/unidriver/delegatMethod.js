/**
 * Temporary workaround for missing unidriver methods.
 * @depreacted
 */
export async function delegateToReactDOM(base, methodName, reactDriverFactory) {
  if (base.type !== 'react') {
    throw new Error(
      `${methodName}() not supported for platforms other than react/dom`,
    );
  }
  return reactDriverFactory({
    element: await base.getNative(),
  })[methodName]();
}
