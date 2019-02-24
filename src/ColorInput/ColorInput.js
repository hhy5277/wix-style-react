import React from 'react';
import { node, bool, string, func, oneOf } from 'prop-types';

import { polyfill } from 'react-lifecycles-compat';
import { placements } from '../Popover';
import Input from '../Input';
import { Hash, ColorViewer } from './components';

import { validateHex, extractHex } from './hex-helpers';

class ColorInput extends React.Component {
  static displayName = 'ColorInput';

  static propTypes = {
    /** placeholder to display */
    placeholder: node,
    /** when set to true this component is disabled */
    disabled: bool,
    /** sets error state */
    error: bool,
    /** error message which appears in tooltip */
    errorMessage: node,
    /** input size */
    size: oneOf(['small', 'medium', 'large']),
    /** colorpicker popover placement */
    popoverPlacement: oneOf([...placements]),
    /** colorpicker popover calculation to a dom element */
    popoverAppendTo: oneOf(['window', 'scrollParent', 'viewport', 'parent']),
    /** input value */
    value: string.isRequired,
    /** returns confirmed value */
    onConfirm: func,
    /** returns last confirmed value which is props.value */
    onCancel: func,
    /** returns colorpicker change value */
    onPreview: func,
  };

  static defaultProps = {
    placeholder: 'Please choose a color',
    error: false,
    size: 'medium',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      value: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value && state.active === false) {
      return {
        ...state,
        value: props.value.toUpperCase(),
      };
    }
  }

  _renderPrefix = () => {
    const { disabled, size } = this.props;
    const { active, value } = this.state;
    const hash = (
      <Input.Affix>
        <Hash disabled={disabled} size={this._sizeMapping(size)} />
      </Input.Affix>
    );
    return active || value ? hash : undefined;
  };

  _renderSuffix = () => {
    const { value, active } = this.state;
    const { size, popoverPlacement, popoverAppendTo, disabled } = this.props;
    return (
      <ColorViewer
        value={value}
        active={active}
        disabled={disabled}
        size={this._sizeMapping(size)}
        placement={popoverPlacement}
        appendTo={popoverAppendTo}
        onClick={this._onClick}
        onChange={this._onPickerChange}
        onCancel={this._onCancel}
        onConfirm={this._onConfirm}
        onClickOutside={this._onConfirm}
      />
    );
  };

  _sizeMapping = size => (size === 'medium' ? 'normal' : size);

  _onChange = evt => {
    const value = extractHex(evt.target.value);
    this.setState({
      value: value === '' ? '' : `#${value}`,
    });
  };

  _onPickerChange = value => {
    const { onPreview } = this.props;
    const callback = onPreview && onPreview(value);
    this.setState({ value, active: true }, callback);
  };

  _onClick = () => {
    this.input.focus();
    this.setState({ active: true });
  };

  _onFocus = () => this.setState({ active: true });

  _onKeyDown = e => {
    e.key === 'Enter' && this._onConfirm();
    e.key === 'Escape' && this._onCancel();
  };

  _onConfirm = () => {
    const { onConfirm } = this.props;
    const value = validateHex(this.state.value);
    const callback = () => onConfirm && onConfirm(value);
    this.setState({ active: false, value }, callback);
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    const callback = () => onCancel && onCancel(this.props.value);
    this.setState({ value: this.props.value, active: false }, callback);
  };

  render() {
    const { placeholder, errorMessage, size, ...rest } = this.props;
    const { active, value } = this.state;
    const placeHolder = active ? undefined : placeholder;
    return (
      <Input
        {...rest}
        ref={input => (this.input = input)}
        status={this.props.error ? 'error' : undefined}
        statusMessage={errorMessage}
        placeholder={placeHolder}
        size={this._sizeMapping(size)}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
        onFocus={this._onFocus}
        onInputClicked={this._onClick}
        value={value.replace('#', '')}
        prefix={this._renderPrefix()}
        suffix={this._renderSuffix()}
      />
    );
  }
}

polyfill(ColorInput);

export default ColorInput;
