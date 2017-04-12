import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../config';
import { Switch, Route } from 'react-router-dom';

import { Signup, Login } from '../components';

const App = (props) => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route exact path="/signup" component={Signup}/>
			<Route exact path="/login" component={Login}/>
		</Switch>
	</ConnectedRouter>
)

export default connect(state => ({

}), {})(App);