import React,{Component,PropTypes} from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
//root
const rootEle = document.getElementById("app")

//component
class Counter extends Component{
	render(){
		const {value,onIncreaseClick} = this.props
		return(
			<div>
				<span>{value}</span>
				<button onClick={onIncreaseClick}>Increse</button>
			</div>
		)
	}
}
// valid
Counter.propTypes = {
	value : PropTypes.number.isRequired,
	onIncreaseClick : PropTypes.func.isRequired
}

//action
const increaseAction = {
	type : 'increase'
}

//reducer
function counter(state = { count : 0 },action){
	const count = state.count
	switch(action.type){
		case 'increase': return { count : count + 1}
		default : return state
	}
}

//store
const store = createStore(counter)

// mapStateToProps

function mapStateToProps(state){
	return {
		value : state.count
	}
}

//mapDispatchToProps
function mapDispatchToProps(dispatch){
	return {
		onIncreaseClick : ()=>{dispatch(increaseAction)}
	}
}

//connet
const App = connect(mapStateToProps,mapDispatchToProps)(Counter)

//render
ReactDom.render(
<Provider store={store}>
	<App />
</Provider>
,
rootEle
)