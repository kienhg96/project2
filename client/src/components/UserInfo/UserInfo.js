import React, { Component } from 'react';
import { Paper, TextField, SelectField, MenuItem,
		RaisedButton } from 'material-ui';

const style = {
	container: {
		margin: 10,
		padding: 20
	},
	title: {
		fontWeight: 500,
		textAlign: 'center'
	}
};

export default class UserInfo extends Component {
	constructor(props) {
		super(props);
		const { user } = this.props;
		this.state = {
			cityId: user.district.city.cityId,
			districtId: user.district.districtId,
			fullName: user.fullName,
			oldPassword: '',
			newPassword: ''
		}
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
		this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
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

	handlePhoneChange(e, phone) {
		this.setState({phone});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit({
			fullName: this.state.fullName,
			districtId: this.state.districtId
		});
	}

	handleOldPasswordChange(e, oldPassword) {
		this.setState({oldPassword});
	}

	handleNewPasswordChange(e, newPassword) {
		this.setState({newPassword});
	}

	handlePasswordSubmit(e) {
		e.preventDefault();
		this.props.onSubmitPassword({
			oldPassword: this.state.oldPassword,
			newPassword: this.state.newPassword
		});
	}

	render() {
		const { cityId, districtId, fullName, oldPassword, newPassword } = this.state;
		const {cities} = this.props;
		const districts = (cities.find(city => city.cityId === cityId) || {districts: []}).districts;
		return (
			<div className="dashContainer">
				<Paper zDepth={1} style={style.container}>
					<h1 style={style.title}>Thông tin người dùng</h1>
					<form onSubmit={this.handleSubmit}>
						<TextField
							floatingLabelText="Số điện thoại"
							fullWidth={true}
							value={this.props.user.phone}
							disabled={true}
						/>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							type="email"
							value={this.props.user.email}
							disabled={true}
						/>
						<TextField
							floatingLabelText="Tên đầy đủ"
							fullWidth={true}
							value={fullName}
							onChange={this.handleFullNameChange}
						/>
						<SelectField
								floatingLabelText="Tỉnh/Thành phố"
								fullWidth={true}
								maxHeight={200}
								value={cityId}
								onChange={this.handleCityChange}
							>
						{cities.map(city => (
							<MenuItem key={city.cityId} value={city.cityId} primaryText={city.name} />
						))}
						</SelectField>
						<SelectField
							floatingLabelText="Quận/Huyện"
							fullWidth={true}
							maxHeight={200}
							onChange={this.handleDistrictChange}
							value={districtId}
						>
							{
								districts.map(district => (
									<MenuItem key={district.districtId} value={district.districtId} 
										primaryText={district.name} />
								))
							}
						</SelectField>
						<RaisedButton label="Cập nhật thông tin"
							primary={true}
							fullWidth={true}
							type="submit"
						/>
					</form>
				</Paper>
				<Paper zDepth={1} style={style.container}>
					<form onSubmit={this.handlePasswordSubmit}>
						<h1 style={style.title}>Thay đổi mật khẩu</h1>
						<TextField
							floatingLabelText="Mật khẩu cũ"
							fullWidth={true}
							type="password"
							value={oldPassword}
							onChange={this.handleOldPasswordChange}
						/>
						<TextField
							floatingLabelText="Mật khẩu mới"
							fullWidth={true}
							type="password"
							value={newPassword}
							onChange={this.handleNewPasswordChange}
						/>
						<RaisedButton label="Cập nhật mật khẩu"
							primary={true}
							fullWidth={true}
							type="submit"
						/>
					</form>
				</Paper>
			</div>
		);
	}
}