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
		const { cities } = this.props;
		if (!cities[0]) {
			this.loadCityFlag = true;
		}
		this.state = {
			fullName: '',
			phone: '', 
			email: '', 
			password: '',
			cityId: cities[0] ? cities[0].cityId : 0,
			districtId: cities[0] ? cities[0].districts[0].districtId : 0
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);
	}

	componentDidUpdate() {
		if (this.loadCityFlag) {
			this.loadCityFlag = false;
			this.handleCityChange(null, null, this.props.cities[0].cityId);
		}
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.signup(this.state);
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

	handleCityChange(e, i, cityId) {
		const city = this.props.cities.find(c => c.cityId === cityId);
		this.setState({cityId, districtId: city.districts[0].districtId});
	}

	handleDistrictChange(e, i, districtId) {
		this.setState({districtId});
	}

	handleFullNameChange(e, fullName) {
		this.setState({fullName});
	}

	render() {
		const { phone, email, password, cityId, districtId, fullName } = this.state;
		const { handleFormSubmit, handlePhoneChange, handleFullNameChange,
				handleEmailChange, handlePasswordChange,
				handleCityChange, handleDistrictChange } = this;
		const {cities} = this.props;
		const districts = (cities.find(city => city.cityId === cityId) || {districts: []}).districts;
		return (
			<div style={style.container}>
				<Paper zDepth={3} style={style.wrapper}>
					<h1 style={style.title}>Đăng ký</h1>
					<form onSubmit={handleFormSubmit}>
						<TextField
							floatingLabelText="Tên đầy đủ"
							fullWidth={true}
							value={fullName}
							onChange={handleFullNameChange}
						/>
						<TextField
							floatingLabelText="Số điện thoại"
							fullWidth={true}
							value={phone}
							onChange={handlePhoneChange}
						/>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							type="email"
							value={email}
							onChange={handleEmailChange}
						/>
						<TextField
							floatingLabelText="Mật khẩu"
							fullWidth={true}
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
						<SelectField
							floatingLabelText="Tỉnh/Thành phố"
							fullWidth={true}
							maxHeight={200}
							value={cityId}
							onChange={handleCityChange}
						>
						{cities.map(city => (
							<MenuItem key={city.cityId} value={city.cityId} primaryText={city.name} />
						))}
						</SelectField>
						<SelectField
							floatingLabelText="Quận/Huyện"
							fullWidth={true}
							maxHeight={200}
							onChange={handleDistrictChange}
							value={districtId}
						>
							{
								districts.map(district => (
									<MenuItem key={district.districtId} value={district.districtId} 
										primaryText={district.name} />
								))
							}
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
