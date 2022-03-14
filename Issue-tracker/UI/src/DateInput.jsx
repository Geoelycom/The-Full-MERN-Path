import React, { useState } from 'react';

function displayFormat(date) {
  return (date != null) ? date.toDateString() : '';
}

function editFormat(date) {
  return (date != null) ? date.toISOString().substr(0, 10) : '';
}

function unFormat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default function DateInput(props) {
  const [values, updateValue] = useState({
    value: editFormat(props.value), focused: false, valid: true,
  });

  function onFocus() {
    updateValue({ focused: true });
  }

  function onBlur(e) {
    const { value, valid: oldValid } = values;
    const { onValidityChange, onChanged } = props;
    const dateValue = unFormat(value);
    const valid = value === '' || dateValue != null;
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, dateValue);
    }
    updateValue({ focused: false, valid });
    if (valid) {
      onChanged(e, dateValue);
    }
  }

  function onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      updateValue({ value: e.target.value });
    }
  }
  const { value: originalValue, name } = props;
  const { valid, focused, value } = values;
  const className = (!valid && !focused) ? 'invalid' : null;
  const displayValue = (focused || !valid) ? value : displayFormat(originalValue);
  return (
    <input
      type="text"
      size={20}
      name={name}
      className={className}
      value={displayValue}
      placeholder={focused ? 'yyyy-mm-dd' : null}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />

  );
}
