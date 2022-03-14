import React, { useState } from 'react';
// import React from 'react';

function format(num) {
  return num != null ? num.toString() : '';
}


function unFormat(str) {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

export default function NumInputs(props) {
  const [value, setValue] = useState(format(props.value));

  function onChange(e) {
    const newVal = e.target.value;
    if (e.target.value.match(/^\d*$/)) {
      setValue(newVal);
    }
  }
  function onBlur(e) {
    onChange(e);
    setValue();
    onChange(e, unFormat(value));
  }

  return (
    <input
      type="text"
      {...props}
      value={value || ''}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}


// export default class NumInputs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: format(props.value),
//     };
//     this.onBlur = this.onBlur.bind(this);
//     this.onChange = this.onChange.bind(this);
//   }

//   onChange(e) {
//     if (e.target.value.match(/^\d*$/)) {
//       console.log(this.setState({ value: e.target.value }));
//     }
//   }

//   onBlur(e) {
//     const { onChange } = this.props;
//     const { value } = this.state;
//     onChange(e, unFormat(value));
//   }

//   render() {
//     const { value } = this.state;
//     return (
//       <input
//         type="text"
//         {...this.props}
//         value={value}
//         onBlur={this.onBlur}
//         onChange={this.onChange}
//       />
//     );
//   }
// }
