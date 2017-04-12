import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './config';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';

injectTapEventPlugin();

ReactDOM.render(
  	<MuiThemeProvider>
	  	<Provider store={store}>
	  		<App />
		</Provider>
	</MuiThemeProvider>,
  	document.getElementById('root')
);
