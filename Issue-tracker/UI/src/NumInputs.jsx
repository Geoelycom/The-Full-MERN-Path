import React, { useState } from 'react';

function format(num) {
  return num !== null ? num.toString() : '';
}

function unFormat(str) {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

export default function NumInputs(props) {
  const [value, setValue] = useState(format(props.value));

  function onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      setValue(e.target.value);
    }
  }

  function onBlur(e) {
    useState(value);
    onChange();
    onChange(e, unFormat(value));
  }

  return (
    <input
      type="text"
      {...props}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
