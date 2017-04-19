import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default ({show, content, closeInfo}) => (
	<Snackbar
		open={show}
		message={content}
		autoHideDuration={5000}
		action="Đóng"
		onRequestClose={(reason) => {
			if (reason !== "clickaway") {
				closeInfo();
			}
		}}
		onActionTouchTap={() => {
			closeInfo();
		}}
	/>
)
