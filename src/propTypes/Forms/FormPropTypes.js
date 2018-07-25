import PropTypes from 'prop-types';


export const InputPropTypes = PropTypes.shape({
  /** When nested in FormSection, returns the name prop prefixed with the FormSection name. Otherwise, returns the name prop that you passed in.*/
  name: PropTypes.string,
  /** The value of this form field. */
  value: PropTypes.any,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
});


export const MetaPropTypes = PropTypes.shape({
  active: PropTypes.bool,
  autofilled: PropTypes.bool,
  asyncValidating: PropTypes.bool,
  dirty: PropTypes.bool,
  dispatch: PropTypes.func,
  error: PropTypes.string,
  form: PropTypes.string,
  initial: PropTypes.any,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  touched: PropTypes.bool,
  submitFailed: PropTypes.bool,
  valid: PropTypes.bool,
  visited: PropTypes.bool,
  warning: PropTypes.bool,
});

export default {
  MetaPropTypes,
  InputPropTypes,
}
