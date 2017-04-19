import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { ItemHorizontal, ItemDetail, 
		AddProduct, Navbar, Snack, Loading } from '../components';
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

const App = (props) => (
	<ConnectedRouter history={history}>
		<div>
			<div style={style.navbar}>
				<Navbar isLogged={props.user.userId ? true : false} logout={props.logout}/>
			</div>
			<div style={style.content}>
				<Switch>
					<Route exact path="/" component={ItemDetail}/>
					<Route exact path="/signup" component={Signup}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/item" component={ItemHorizontal}/>
					<Route exact path="/detail" component={ItemDetail}/>
					<Route exact path="/add" render={() => 
						<AddProduct 
							cities={props.cities}
							categories={props.categories}
							onSubmit={props.addProduct}
						/>}
					/>
					<Route exact path="/loading" component={Loading}/>
				</Switch>
			</div>
			<Snack open={props.snack.open} message={props.snack.message}
				onRequestClose={props.closeSnackMessage}
			/>
		</div>
	</ConnectedRouter>
)

import { closeSnackMessage } from '../actions/snack';
import { logout } from '../actions/authenticate';
import { addProduct } from '../actions/products';

export default connect(state => ({
	snack: state.snack,
	user: state.user,
	cities: state.cities,
	categories: state.categories
}), {
	closeSnackMessage, logout, addProduct
})(App);