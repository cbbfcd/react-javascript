import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import reduce from './reducer/reduce'

// 建立store,参数传reducer
const store = createStore(reduce)

// 获取render的位置
const rootE1 = document.getElementById("app")

const render = ()=> ReactDOM.render(
	<Counter value={store.getState()}
	onIncrement={() => store.dispatch({type:'INCREMENT'})}
	onDecrement={() => store.dispatch({type:'DECREMENT'})}
	/>,
	rootE1
)

render()
store.subscribe(render)