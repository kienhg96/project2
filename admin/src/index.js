import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { purple500, purple700, purple400 } from 'material-ui/styles/colors';
import Loading from './components/Loading';
import $ from 'jquery';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider muiTheme={getMuiTheme(customeTheme)}>
		<Loading />
	</MuiThemeProvider>,
	document.getElementById('root')
);

const render = (user) => {
	ReactDOM.render(
		<MuiThemeProvider muiTheme={getMuiTheme(customeTheme)}>
			<App user={user}/>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
}

$.ajax({
	url: '/api/admin/getInfo',
	type: 'GET',
	success: response => {
		if (response.error === "OK") {
			render(response.data);
		} else {
			render({});
		}
	},
	error: xhr => {
		render({});
	}
});
