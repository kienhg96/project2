import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './config';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';
import { getCities } from './actions/cities';
import { getCategories } from './actions/categories';
import { loadUser } from './actions/authenticate';
import { Loading } from './components';
import { purple500, purple700, purple400 } from 'material-ui/styles/colors';

store.dispatch(getCities());
store.dispatch(getCategories());
injectTapEventPlugin();

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
		<Loading />
	</MuiThemeProvider>,
	document.getElementById('root')
)

store.dispatch(loadUser(() => {
	ReactDOM.render(
	  	<MuiThemeProvider muiTheme={getMuiTheme(customeTheme)}>
		  	<Provider store={store}>
		  		<App />
			</Provider>
		</MuiThemeProvider>,
	  	document.getElementById('root')
	);
}));
