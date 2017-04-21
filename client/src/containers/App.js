import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { AddActionButton, Snack, 
		AddProduct, Navbar, LeftDrawer,
		MyProducts, Search, UserInfo,
		ShowProductKey, ProductWithKey } from '../components';
import Signup from './Signup';
import Login from './Login';
import Dash from './Dash';
import ItemDetail from './ItemDetail';
import './style.css';

const style = {
	navbar: {
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: 1301
	},
	content: {
		marginTop: 80,
		transition: 'margin-left 200ms'
	}
}

const App = (props) => (
	<ConnectedRouter history={history}>
		<div>
			<div style={style.navbar}>
				<Navbar isLogged={props.user.userId ? true : false} logout={props.logout}
					onLeftIconClick={() => {props.setDrawer(!props.leftDrawer.open)}}
					onSearchSubmit={query => props.push(`/search/${query}`)}
				/>
			</div>
			<div style={style.content} className={props.leftDrawer.open ? "leftContent" : ""}>
				<Switch>
					<Route exact path="/" component={Dash}/>
					<Route exact path="/signup" component={Signup}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/detail/:id" component={ItemDetail}/>
					<Route exact path="/add" render={() => 
						<AddProduct 
							cities={props.cities}
							categories={props.categories}
							onSubmit={props.addProduct}
						/>}
					/>
					<Route exact path="/myproducts" render={() =>
						<MyProducts user={props.user} 
							push={props.push}
							showSnackMessag={props.showSnackMessage}
						/>
					}/>
					<Route exact path="/search/:query" render={({match}) => 
						<Search match={match} showSnackMessage={props.showSnackMessage}/>
					}/>
					<Route exact path="/info" render={() =>
						<UserInfo cities={props.cities} user={props.user}
							onSubmit={props.updateInfo}
							onSubmitPassword={props.updatePassword}
						/>
					} />
					<Route exact path="/productKey/:productKey" render={({match}) => 
						<ShowProductKey productKey={match.params.productKey}/>
					}/>
					<Route exact path="/product" component={ProductWithKey}/>
				</Switch>
			</div>
			<Snack open={props.snack.open} message={props.snack.message}
				onRequestClose={props.closeSnackMessage}
			/>
			<AddActionButton />
			<LeftDrawer open={props.leftDrawer.open}
				cities={props.cities} categories={props.categories}
				setFilter={props.setFilter} getProducts={props.getProducts}
			/>
		</div>
	</ConnectedRouter>
)

import { closeSnackMessage, showSnackMessage } from '../actions/snack';
import { logout, updateInfo, updatePassword } from '../actions/authenticate';
import { addProduct, getProducts } from '../actions/products';
import { setDrawer } from '../actions/leftDrawer';
import { setFilter } from '../actions/filter';
import { push } from 'react-router-redux';

export default connect(state => ({
	snack: state.snack,
	user: state.user,
	cities: state.cities,
	categories: state.categories,
	leftDrawer: state.leftDrawer
}), {
	closeSnackMessage, logout, addProduct,
	setDrawer, push, showSnackMessage, setFilter,
	getProducts, updateInfo, updatePassword
})(App);