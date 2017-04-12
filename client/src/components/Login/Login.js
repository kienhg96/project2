import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	container: {
		margin: '40px auto',
		maxWidth: 500
	},
	wrapper: {
		padding: 20
	},
	title: {
		textAlign: 'center',
		fontWeight: 500
	}
};

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		// Login Here
		console.log(this.state);
	}

	handleUsernameChange(e, username) {
		this.setState({username});
	}

	handlePasswordChange(e, password) {
		this.setState({password});
	}

	render() {
		const { username, password } = this.state;
		const { handleUsernameChange, handlePasswordChange } = this;
		return (
			<div style={style.container}>
				<Paper zDepth={3} style={style.wrapper}>
					<h1 style={style.title}>Đăng nhập</h1>
					<form onSubmit={this.handleFormSubmit}>
						<TextField
							floatingLabelText="Số điện thoại/Email"
							fullWidth={true}
							value={username}
							onChange={handleUsernameChange}
						>
						</TextField>
						<TextField
							floatingLabelText="Mật khẩu"
							fullWidth={true}
							type="password"
							value={password}
							onChange={handlePasswordChange}
						>
						</TextField>
						<RaisedButton label="Đăng nhập"
							primary={true}
							fullWidth={true}
							type="submit"
						/>
					</form>
				</Paper>
			</div>
		)
	}
}
