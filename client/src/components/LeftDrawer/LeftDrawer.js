import React, { Component } from 'react';
import { Drawer, MenuItem, SelectField, RaisedButton,
		Dialog, FlatButton, RadioButtonGroup, RadioButton } from 'material-ui';

const style = {
	container: {
		marginTop: 80,
		paddingLeft: 15,
		paddingRight: 15
	},
	title: {
		margin: 0,
		textAlign: 'center',
		fontWeight: 500
	},
	button: {
		marginTop: 10,
		marginBottom: 10
	},
	checkbox: {
		marginTop: 16,
	},
}

export default class LeftDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			cityId: 0,
			districtId: 0,
			categoryId: 0
		}
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOpenDialog() {
		this.setState({
			openDialog: true
		})
	}

	handleCloseDialog() {
		this.setState({
			openDialog: false
		})
	}

	handleCityChange(e, i, cityId) {
		this.setState({cityId, districtId: 0});
	}

	handleDistrictChange(e, i, districtId) {
		this.setState({districtId});
	}

	handleCategoryChange(e, categoryId) {
		this.setState({categoryId});
	}

	handleSubmit() {
		const { cityId, districtId, categoryId } = this.state;
		this.props.setFilter({
			cityId, districtId, categoryId
		});
		this.props.getProducts();
	}
	
	render() {
		const dialogActions = [
			<FlatButton
				label="Đóng"
				primary={true}
				onTouchTap={this.handleCloseDialog}
			/>
		]
		const { cityId, districtId } = this.state;
		const { cities, categories } = this.props;
		const districts = (cities.find(city => city.cityId === cityId) || {districts: []}).districts;
		return (
			<Drawer open={this.props.open}>
				<div style={style.container}>
					<h2 style={style.title}>Lọc</h2>
					<SelectField
						floatingLabelText="Tỉnh/Thành phố"
						fullWidth={true}
						maxHeight={200}
						value={cityId}
						onChange={this.handleCityChange}
					>
						<MenuItem value={0} primaryText="Tất cả" />
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
						<MenuItem value={0} primaryText="Tất cả" />
						{
							districts.map(district => (
								<MenuItem key={district.districtId} value={district.districtId} 
									primaryText={district.name} />
							))
						}
					</SelectField>
					<RaisedButton
						label="Chủ đề"
						onTouchTap={this.handleOpenDialog}
						fullWidth={true}
						style={style.button}
					/>
					<RaisedButton 
						primary={true}
						label="Áp dụng"
						fullWidth={true}
						onTouchTap={this.handleSubmit}
					/>
				</div>
				<Dialog
					title="Chọn các chủ đề cho sản phẩm"
					actions={dialogActions}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.handleCloseDialog}
					autoScrollBodyContent={true}
				>
					<RadioButtonGroup name="Category"
						valueSelected={this.state.categoryId}
						onChange={this.handleCategoryChange}
					>
						<RadioButton
							label="Tất cả"
							style={style.checkbox}
							value={0}
						/>
						{categories.map(cate => 
							<RadioButton
								key={cate.categoryId}
								label={cate.name}
								style={style.checkbox}
								value={cate.categoryId}
							/>
						)}
					</RadioButtonGroup>
				</Dialog>
			</Drawer>
		);
	}
}
