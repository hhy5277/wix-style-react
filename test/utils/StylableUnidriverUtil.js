/**
 * This is an implementation of StylableDOMUtil for Unidriver.
 *
 * Work-In-Progress: Not all methods are implemented yet !
 */
export class StylableUnidriverUtil {
  constructor(style) {
    this.style = style;
  }

  async hasStyleState(base, stateName, param = true) {
    const { stateKey, styleState } = this.getStateDataAttrKey(stateName, param);
    const actual = await base.attr(stateKey);
    return String(styleState[stateKey]) === actual;
  }

  getStateDataAttrKey(state, param = true) {
    const styleState = this.style.$cssStates({ [state]: param });
    return { stateKey: Object.keys(styleState)[0], styleState };
  }
}
