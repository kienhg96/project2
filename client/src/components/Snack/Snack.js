import React from 'react';
import { Snackbar } from 'material-ui';

export default ({open, message, onRequestClose}) => (
	<Snackbar
		open={open}
		message={message}
		action="Đóng"
		autoHideDuration={5000}
		onRequestClose={r => r !== "clickaway" && onRequestClose()}
		onActionTouchTap={onRequestClose}
	/>
)