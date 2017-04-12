import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Notifycation extends Component {
	render() {
		return (
			<Snackbar
				open={this.props.show}
				message={this.props.content}
				autoHideDuration={5000}
				action="Đóng"
				onRequestClose={(reason) => {
					if (reason !== "clickaway") {
						this.props.closeInfo();
					}
				}}
				onActionTouchTap={() => {
					this.props.closeInfo();
				}}
			/>
		)
	}
}
