import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { ItemHorizontal, ItemDetail, 
		AddProduct, Navbar, Snack } from '../components';
import Signup from './Signup';
import Login from './Login';

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

const App = ({snack, closeSnackMessage}) => (
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
			<Snack open={snack.open} message={snack.message}
				onRequestClose={closeSnackMessage}
			/>
		</div>
	</ConnectedRouter>
)

import { closeSnackMessage } from '../actions/snack';

export default connect(state => ({
	snack: state.snack
}), {
	closeSnackMessage
})(App);