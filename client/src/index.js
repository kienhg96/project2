import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/config';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style.css';
import Login from './containers/Login';
import Signup from './containers/Signup';
import App from './containers/App';

const history = syncHistoryWithStore(hashHistory, store);
injectTapEventPlugin();

ReactDOM.render(
  	<MuiThemeProvider>
	  	<Provider store={store}>
	  		<Router history={history}>
	  			<Route path="/" component={App}>
	  				<Route path="login" component={Login} />
	  				<Route path="signup" component={Signup} />
	  			</Route>
	  		</Router>
		</Provider>
	</MuiThemeProvider>,
  	document.getElementById('root')
);
