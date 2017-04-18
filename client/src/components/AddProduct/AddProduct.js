import React, { Component } from 'react';
import { Paper, TextField, SelectField, MenuItem,
		RaisedButton } from 'material-ui';
import {GridList, GridTile} from 'material-ui/GridList';
const style = {
	container: {
		margin: 50,
		padding: 30
	},
	title: {
		fontWeight: 500,
		marginTop: 0,
		textAlign: 'center'
	},
	imageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0,
	},
	imagesUpload: {
		marginTop: 10,
		marginBottom: 10
	},
	submitButton: {
		marginTop: 20
	},
	image: {
		marginRight: 5
	},
	gridList: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
	},
}

const imageToBase64 = (file, callback) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		callback(reader.result);
	}
	reader.onerror = (err) => {
		throw err;
	}
}

const cityList = [{
	cityId: 1,
	name: "Hà Nội"
}, {
	cityId: 2,
	name: "Tp.Hồ Chí Minh"
}, {
	cityId: 3,
	name: "Đà Nẵng"
}, {
	cityId: 4,
	name: "Hải Phòng"
}];

const districtList = [{
	districtId: 1,
	name: "Hai Bà Trưng"
}, {
	districtId: 2,
	name: "Cầu Giấy"
}, {
	districtId: 3,
	name: "Long Biên"
}, {
	districtId: 4,
	name: "Thanh Xuân"
}];

export default class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			name: '',
			description: '',
			price: '',
			districtId: 0,
			cityId: 0,
			districtList: []
		}
		this.handleFileInputChange = 
				this.handleFileInputChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = 
				this.handleDescriptionChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		// Submit here
		console.log('Submit');
	}

	handleFileInputChange(e) {
		const files = e.target.files;
		const length = files.length <= 6 ? files.length : 6;
		const images = [];
		for (let i = 0; i < length; i++) {
			imageToBase64(files[i], (src) => {
				images.push({
					src,
					modified: files[i].lastModified
				});
				if (images.length === length) {
					this.setState({images});
				}
			});
		}
	}

	handleNameChange(e, name) {
		this.setState({name});
	}

	handleDescriptionChange(e, description) {
		this.setState({description});
	}

	handleCityChange(e, i, cityId) {
		this.setState({cityId,
			districtList,
			districtId: districtList[0].districtId
		});
	}

	handleDistrictChange(e, i, districtId) {
		this.setState({districtId});
	}

	render() {
		return (
			<Paper zDepth={1} style={style.container}>
				<h1 style={style.title}>Đăng bán một sản phẩm</h1>
				<form onSubmit={this.handleSubmit}>
					<TextField
						floatingLabelText="Tên sản phẩm muốn bán"
						fullWidth={true}
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
					<TextField
						floatingLabelText="Mô tả sản phẩm"
						fullWidth={true}
						multiLine={true}
						rows={2}
						rowsMax={4}
						value={this.state.description}
						onChange={this.handleDescriptionChange}
					/>
					<TextField
						floatingLabelText="Giá muốn bán sản phẩm"
						fullWidth={true}
					/>
					<RaisedButton
						label="Tải lên ảnh để tăng sự tin tưởng của người dùng (Tối đa 6 ảnh)"
						style={style.imagesUpload}
						fullWidth={true}
						labelPosition="before"
						containerElement="label"
					>
						<input type="file" style={style.imageInput} 
							multiple={true} accept="image/*" 
							onChange={this.handleFileInputChange}
						/>
					</RaisedButton>
					<div>
						<GridList style={style.gridList} cols={2.2} cellHeight={200}>
							{this.state.images.map(image => (
								<GridTile
									key={image.modified}
								>
									<img src={image.src} alt="Ảnh mô tả sản phẩm"/>
								</GridTile>
							))}
						</GridList>
					</div>
					<SelectField
						floatingLabelText="Tỉnh/Thành Phố"
						fullWidth={true}
						maxHeight={200}
						value={this.state.cityId}
						onChange={this.handleCityChange}
					>	
						{
							cityList.map(city => (
								<MenuItem key={city.cityId}
									value={city.cityId} primaryText={city.name}
								/>
							))
						}
					</SelectField>
					<SelectField
						floatingLabelText="Quận/Huyện"
						fullWidth={true}
						maxHeight={200}
						value={this.state.districtId}
						onChange={this.handleDistrictChange}
					>
						{
							this.state.districtList.map(district => (
								<MenuItem key={district.districtId}
									value={district.districtId} primaryText={district.name}
								/>
							))
						}
					</SelectField>
					<RaisedButton primary={true} type="submit" 
						label="Đăng bán"
						fullWidth={true}
						style={style.submitButton}
					/>
				</form>
			</Paper>
		);
	}
}
