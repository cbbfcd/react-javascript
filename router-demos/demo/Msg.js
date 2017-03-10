import React from 'react'
import ReactDOM from 'react-dom';
//坑1：this
const Msg = (props)=>(<h3>{props.params.id}</h3>)
export default Msg

