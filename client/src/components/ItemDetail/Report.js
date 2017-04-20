import React, {Component} from 'react';
import { FlatButton, Dialog, TextField } from 'material-ui';

import style from './style';

export default class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			message: ''
		}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOpen() {
		this.setState({open: true});
	};

	handleClose() {
		this.setState({open: false});
	}

	handleSubmit() {
		this.props.onSubmit(this.state.message);
		this.setState({message: '', open: false});
	}

	handleMessageChange(e, message) {
		this.setState({ message });
	}

	render() {
		const actions = [
			<FlatButton
				label="Hủy"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Gửi"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleSubmit}
			/>,
		];
		return (
			<div style={style.reportWrapper}>
				<FlatButton label="Báo cáo vi phạm"
					onTouchTap={this.handleOpen}
				/>
				<Dialog
					title="Báo cáo vi phạm"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<TextField
						floatingLabelText="Gửi một mô tả về sản phẩm"
						multiLine={true}
						rows={2}
						rowsMax={4}
						fullWidth={true}
						value={this.state.message}
						onChange={this.handleMessageChange}
					/>
				</Dialog>
			</div>
		)
	}
}
