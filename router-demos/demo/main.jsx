import React from 'react'
import ReactDOM from 'react-dom';
import About from './About'
import Home from './Home'
import Index from './Index'
import Msg from './Msg'


// 不用router实现前端路由
/*class App extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			route:window.location.hash.substr(1)
		}
	}

	componentDidMount(){
		window.addEventListener("hashchange",()=>{
			this.setState({
				route:window.location.hash.substr(1)
			})
		})
	}

	render(){
		let Child
		switch(this.state.route){
			case '/about':Child = About;break;
			case '/index':Child = Index;break;
			default:Child=Home;
		}

		return(
			<div>
				<h1>Route Demo</h1>
		        <ul>
		          <li><a href="#/about">About</a></li>
		          <li><a href="#/inbox">Inbox</a></li>
		        </ul>
		        <Child/>
			</div>
		)
	}
}

ReactDOM.render(
  <App/>
  ,
  document.querySelector('#app')
);*/

// router实现
import { Router, Route, Link,hashHistory,browserHistory } from 'react-router'
import { IndexRoute,Redirect } from 'react-router'

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			route:window.location.hash.substr(1)
		}
	}

	componentDidMount(){
		window.addEventListener("hashchange",()=>{
			this.setState({
				route:window.location.hash.substr(1)
			})
		})
	}

	render(){
		return(
			<div>
				<h1>Route Demo</h1>
		        <ul>
		          <li><Link to="about">About</Link></li>
		          <li><Link to="index">Index</Link></li>
		        </ul>
		        {this.props.children}
			</div>
		)
	}
}

/*const router = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="about" component={About} />
			<Route path="index" component={Index} />
		</Route>
	</Router>
)*/
const router = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
		<IndexRoute component={Home}/>
			<Route path="about" component={About} />
			<Route path="index" component={Index}>
				<Route path="/msg/:id" component={Msg}/>
				<Redirect from="msg/:id" to="/msg/:id"/>
			</Route>
		</Route>
	</Router>
)


ReactDOM.render(
  router
  ,
  document.querySelector('#app')
);

/*
	总结以及知识点:
	1. es6 模式下的组件编写一定要有this指向，es5是自动匹配的。
	2. render的组件一定要包在一个模块中，比如div
	3. 一定要区别什么时候用()  什么时候用{} 什么时候用{{}}
	4. 上面的demo是静态路由，大型网站建设一定是动态路由的，router提供了丰富的API实现。
	5. 获取参数  this.props.params.id  或者 this.props.location.query.id
	6. IndexRoute 设置默认页面
	7. 绝对路径+重定向
	   Link:
	       activeStyle()
	       activeClassName()
	8. Hook(页面跳转的钩子) 这些hook会在页面跳转确认时触发一次。
	   使用场景:例如权限验证或者在路由跳转前将一些数据持久化保存起来.
	   onenter:会从最外层的父路由开始直到最下层子路由结束。
	   onleave:会在所有将离开的路由中触发，从最下层的子路由开始直到最外层父路由结束
       上述两个钩子函数常用，需掌握使用技巧，灵活使用。
		    比如代替重定向可以:
		        <Route path="/msg/:id" component={Msg} onEnter={({params},replace)=>{
					replace(`msg/:${params.id}`)
				}}/>
    9. 路径匹配原则（类似正则匹配） path属性也可以使用相对路径（不以/开头），匹配时就会相对于父组件的路径
       注意，路由之间自上而下执行，路径一样的话，第一个执行，后边的都被忽略。
        demo:
            <Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
            <Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
            <Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello

        explain:
             /:  参数
             ()  可选择
             *    任意（非贪婪）  eg  匹配<div>.*</div> 会匹配到最后
             **   任意(贪婪)
    10. history 是router的核心，router通过history监听地址栏的hashchange，然后把状态保存到location(state);
        每一个url对应唯一的一个state对象，可以保存信息，但是不会在url中显示，因为是保存在sessionStorage中

        常用history:
               browserHistory(官方推荐，使用浏览器history.使用后看不见hash,但是需要配置服务器，比如express,ngnix)
               hashHistory(可以看见hash值)
               createMemoryHistory
        historyAPI:
               browserHistory.push

               
               pushState(state, pathname, query)
               replaceState(state, pathname, query)
               goBack()...
    11. 动态路由

        React Router 里的路径匹配以及组件加载都是异步完成的，不仅允许你延迟加载组件，并且可以延迟加载路由配置。
        在首次加载包中你只需要有一个路径定义，路由会自动解析剩下的路径。
        Route 可以定义 getChildRoutes，getIndexRoute 和 getComponents 这几个函数。
        它们都是异步执行，并且只有在需要时才被调用。我们将这种方式称之为 “逐渐匹配”。 
        React Router 会逐渐的匹配 URL 并只加载该 URL 对应页面所需的路径配置和组件。

        demo:
        const CourseRoute = {
		  path: 'course/:courseId',

		  getChildRoutes(location, callback) {
		    require.ensure([], function (require) {
		      callback(null, [
		        require('./routes/Announcements'),
		        require('./routes/Assignments'),
		        require('./routes/Grades'),
		      ])
		    })
		  },

		  getIndexRoute(location, callback) {
		    require.ensure([], function (require) {
		      callback(null, {
		        component: require('./components/Index')
		      })
		    })
		  },

		  getComponents(location, callback) {
		    require.ensure([], function (require) {
		      callback(null, require('./components/Course'))
		    })
		  }
		}

	12. mixin

	13. 服务端渲染--指出404 30X 200
	 	demo:
	 		import { renderToString } from 'react-dom/server'
			import { match, RoutingContext } from 'react-router'
			import routes from './routes'

		serve((req, res) => {
		  // 注意！这里的 req.url 应该是从初始请求中获得的
		  // 完整的 URL 路径，包括查询字符串。
		  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		    if (error) {
		      res.send(500, error.message)
		    } else if (redirectLocation) {
		      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		    } else if (renderProps) {
		      res.send(200, renderToString(<RoutingContext {...renderProps} />))
		    } else {
		      res.send(404, 'Not found')
		    }
		  })
		})
    14. context 路由上下文  history和location两个对象同时存在于路由组件的 context 中
        通过this.context.history 可以获取history
        this.context.router.push() 可以跳转页面
        ....
    15. Double Serve 配置(webpack-dev-server & nodejs express)




    了解底层实现：

	1.简单说明Route的作用：
    
	用户可以通过手动输入或者与页面进行交互来改变 URL，
	然后通过同步或者异步的方式向服务端发送请求获取资源（当然，资源也可能存在于本地），
	成功后重新绘制 UI

	2. 工作机制:

	react-router是基于react架构的，所以说它也应该是可以传递一个props,含有一个state，render一个结果。
	对应起来看，location就是其state,render的结果就是资源路径对应的组件。

	>>>>>>再深入

	当你点击Link to一个路径的时候，其实router底层的代码还是把Link的to,query,hash属性合并转成了<a href="">实现连接的。
    然后createLocation(); 建立Listen(history);调用底层history.pushState();
    现在再回过头来看看我们的demo，发觉你离router原理又近了一步。


    location是什么?
	location = {
		  pathname, // 当前路径，即 Link 中的 to 属性
		  search, // search
		  hash, // 路由系统会将所有的路由信息都保存到 location.hash 中 
		  state, // state 对象
		  action, // location 类型，在点击 Link 时为 PUSH，浏览器前进后退时为 POP，调用 replaceState 方法时为 REPLACE
		  key, // 用于操作 sessionStorage 存取 state 对象
		  query
        }

    props是什么?

    props={
		children:"",
		location:,
		params:,
		route:,
		routeParams:,
		router:,
		routes:
    }
*/