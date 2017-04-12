import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '', 
			email: '', 
			password: '',
			city: 1,
			cityList: [{
				cityId: 1,
				name: 'Hà Nội'
			},{
				cityId: 2,
				name: 'Hải Phòng'
			}]
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
	}

	componentDidMount() {
	}

	handleFormSubmit(e) {
		e.preventDefault();
	}

	handlePhoneChange(e, phone) {
		this.setState({phone});
	}

	handleEmailChange(e, email) {
		this.setState({email});
	}

	handlePasswordChange(e, password) {
		this.setState({password});
	}

	handleCityChange(e, i, city) {
		this.setState({city});
	}

	render() {
		const { phone, email, password } = this.state;
		const { handleFormSubmit, handlePhoneChange,
				handleEmailChange, handlePasswordChange,
				handleCityChange } = this;
		return (
			<div style={style.container}>
				<Paper zDepth={3} style={style.wrapper}>
					<h1 style={style.title}>Đăng ký</h1>
					<form onSubmit={handleFormSubmit}>
						<TextField
							floatingLabelText="Số điện thoại"
							fullWidth={true}
							value={phone}
							onChange={handlePhoneChange}
						>
						</TextField>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							type="email"
							value={email}
							onChange={handleEmailChange}
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
						<SelectField
							floatingLabelText="Tỉnh/Thành phố"
							fullWidth={true}
							maxHeight={200}
							value={this.state.city}
							onChange={handleCityChange}
						>
						{this.state.cityList.map(city => (
							<MenuItem key={city.cityId} value={city.cityId} primaryText={city.name} />
						))}	
						</SelectField>
						<SelectField
							floatingLabelText="Quận/Huyện"
							fullWidth={true}
							maxHeight={200}
							
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
