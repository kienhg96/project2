import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { Signup, Login, ItemHorizontal, ItemDetail } from '../components';

const App = (props) => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route exact path="/signup" component={Signup}/>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/item" component={ItemHorizontal}/>
			<Route exact path="/detail" component={ItemDetail}/>
		</Switch>
	</ConnectedRouter>
)

export default connect(state => ({

}), {})(App);