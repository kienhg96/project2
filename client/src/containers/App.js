import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { Signup, Login, ItemHorizontal, ItemDetail, 
		AddProduct, Navbar } from '../components';

const style = {
	navbar: {
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: 5
	},
	content: {
		marginTop: 80
	}
}

const App = (props) => (
	<ConnectedRouter history={history}>
		<div>
			<div style={style.navbar}>
				<Navbar />
			</div>
			<div style={style.content}>
				<Switch>
					<Route exact path="/" component={ItemDetail}/>
					<Route exact path="/signup" component={Signup}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/item" component={ItemHorizontal}/>
					<Route exact path="/detail" component={ItemDetail}/>
					<Route exact path="/add" component={AddProduct}/>
				</Switch>
			</div>
		</div>
	</ConnectedRouter>
)

export default connect(state => ({

}), {})(App);