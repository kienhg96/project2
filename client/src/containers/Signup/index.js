import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { signup } from '../../actions/authenticate';

const style = {
	margin: '40px auto',
	maxWidth: '500px'
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '', 
			email: '', 
			password: ''
		}
		this.signup = this.signup.bind(this);
	}

	signup() {
		this.props.signup(this.state);
	}

	render() {
		const {
			phone, email, password
		} = this.state;

		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h1 style={{
						textAlign: 'center'
					}}>Đăng ký</h1>
					<form onSubmit={e => {
						e.preventDefault();
						this.signup();
					}}>
						<TextField
							floatingLabelText="Số điện thoại"
							fullWidth={true}
							value={phone}
							onChange={(e, v) => {
								if (!isNaN(v)) {
									this.setState({
										phone: v
									});
								}
							}}
						>
						</TextField>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							type="email"
							value={email}
							onChange={(e, v) => {
								this.setState({
									email: v
								})
							}}
						>
						</TextField>
						<TextField
							floatingLabelText="Mật khẩu"
							fullWidth={true}
							type="password"
							value={password}
							onChange={(e, v) => {
								this.setState({
									password: v
								})
							}}
						>
						</TextField>
						<SelectField
							floatingLabelText="Tỉnh/Thành phố"
							fullWidth={true}
							maxHeight={200}
							value={5}
						>
							<MenuItem value={1} primaryText="Hà Nội" />
							<MenuItem value={2} primaryText="Tp.Hồ Chí Minh" />
							<MenuItem value={3} primaryText="Đà Nẵng" />
							<MenuItem value={4} primaryText="Hải Phòng" />
							<MenuItem value={5} primaryText="Cần Thơ" />
						</SelectField>
						<SelectField
							floatingLabelText="Quận/Huyện"
							fullWidth={true}
							maxHeight={200}
							value={5}
						>
							<MenuItem value={1} primaryText="Hà Nội" />
							<MenuItem value={2} primaryText="Tp.Hồ Chí Minh" />
							<MenuItem value={3} primaryText="Đà Nẵng" />
							<MenuItem value={4} primaryText="Hải Phòng" />
							<MenuItem value={5} primaryText="Cần Thơ" />
						</SelectField>
						<RaisedButton label="Đăng ký"
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
	signup
})(Signup);