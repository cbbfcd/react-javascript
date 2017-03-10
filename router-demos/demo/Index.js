import React from 'react'
import ReactDOM from 'react-dom';

const Index = (props)=>(
	/*console.log(props)*/
	<div>
		<h3>hello Index</h3>
	    {props.children || "this is a default message"}
	</div>
)
export default Index