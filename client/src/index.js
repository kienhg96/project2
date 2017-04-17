import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './config';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';

injectTapEventPlugin();

import { purple500, purple700, purple400 } from 'material-ui/styles/colors';

const customeTheme = {
	spacing: lightBaseTheme.space,
	fontFamily: lightBaseTheme.fontFamily,
	palette: {
		...lightBaseTheme.palette,
		primary1Color: purple500,
		primary2Color: purple700,
		primary3Color: purple400,
		disabledColor: "#757575"
	}
}

ReactDOM.render(
  	<MuiThemeProvider muiTheme={getMuiTheme(customeTheme)}>
	  	<Provider store={store}>
	  		<App />
		</Provider>
	</MuiThemeProvider>,
  	document.getElementById('root')
);
