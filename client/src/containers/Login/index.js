import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { login } from '../../actions/authenticate';

const style = {
	margin: '40px auto',
	maxWidth: '500px'
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.doLogin = this.doLogin.bind(this);
	}
	doLogin() {
		this.props.login(this.state);
	}
	render() {
		const {
			username, password
		} = this.state;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h1 style={{
						textAlign: 'center'
					}}>Đăng nhập</h1>
					<form onSubmit={e => {
						e.preventDefault();
						this.doLogin();
					}}>
						<TextField
							floatingLabelText="Số điện thoại/Email"
							fullWidth={true}
							value={username}
							onChange={e => {
								this.setState({
									username: e.target.value
								})
							}}
						>
						</TextField>
						<TextField
							floatingLabelText="Mật khẩu"
							fullWidth={true}
							type="password"
							value={password}
							onChange={e => {
								this.setState({
									password: e.target.value
								})
							}}
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

export default connect(state => ({

}), {
	login
})(Login);