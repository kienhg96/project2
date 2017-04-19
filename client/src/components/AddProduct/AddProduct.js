import React, { Component } from 'react';
import { Paper, TextField, SelectField, MenuItem, Chip, 
		RaisedButton, Dialog, FlatButton, Checkbox } from 'material-ui';
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
	checkbox: {
		marginTop: 16,
	},
	chipWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 4,
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

export default class AddItem extends Component {
	constructor(props) {
		super(props);
		const { cities } = this.props;
		if (!cities[0]) {
			this.loadCityFlag = true;
		}
		this.state = {
			images: [],
			name: '',
			description: '',
			price: '',
			cityId: cities[0] ? cities[0].cityId : 0,
			districtId: cities[0] ? cities[0].districts[0].districtId : 0,
			categoryIdArr: [],
			openDialog: false
		}
		this.handleFileInputChange = 
				this.handleFileInputChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = 
				this.handleDescriptionChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCategoryCheck = this.handleCategoryCheck.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	componentDidUpdate() {
		if (this.loadCityFlag) {
			this.loadCityFlag = false;
			this.handleCityChange(null, null, this.props.cities[0].cityId);
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		// Submit here
		const { images, name, description, price, districtId,
			categoryIdArr } = this.state;
		this.props.onSubmit({
			name, description, price, districtId, categoryIdArr,
			images: images.map(image => image.src)
		});
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
		const city = this.props.cities.find(c => c.cityId === cityId);
		this.setState({cityId, districtId: city.districts[0].districtId});
	}

	handleDistrictChange(e, i, districtId) {
		this.setState({districtId});
	}

	handlePriceChange(e, price) {
		this.setState({price});
	}

	handleCloseDialog() {
		this.setState({
			openDialog: false
		});
	}

	handleOpenDialog() {
		this.setState({
			openDialog: true
		});
	}

	handleCategoryCheck(categoryId) {
		const categoryIdArr = [...this.state.categoryIdArr];
		const index = categoryIdArr.indexOf(categoryId);
		if (index === -1) {
			categoryIdArr.push(categoryId);
		} else {
			categoryIdArr.splice(index, 1);
		}
		this.setState({categoryIdArr});
	}

	render() {
		const { cityId, districtId, categoryIdArr } = this.state;
		const { cities, categories } = this.props;
		const districts = (cities.find(city => city.cityId === cityId) || {districts: []}).districts;
		const dialogActions = [
			<FlatButton
				label="Đóng"
				primary={true}
				onTouchTap={this.handleCloseDialog}
			/>
		]
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
						rowsMax={8}
						value={this.state.description}
						onChange={this.handleDescriptionChange}
					/>
					<TextField
						floatingLabelText="Giá muốn bán sản phẩm"
						fullWidth={true}
						value={this.state.price}
						onChange={this.handlePriceChange}
					/>
					<RaisedButton
						style={{marginTop: 15}}
						label="Chọn các chủ đề cho sản phẩm"
						onTouchTap={this.handleOpenDialog}
					/>
					<div style={{marginTop: 10, marginBottom: 10}}>
						{categoryIdArr.length === 0 ? <div>Chưa có chủ đề nào được chọn</div> : 
							<div style={style.chipWrapper}>
								{categoryIdArr.map(id => categories.find(cat => cat.categoryId === id))
									.map(cat => 
										<Chip style={style.chip} key={cat.categoryId}>
											{cat.name}
										</Chip>
								)}
							</div>
						}
					</div>
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
					<RaisedButton primary={true} type="submit" 
						label="Đăng bán"
						fullWidth={true}
						style={style.submitButton}
					/>
				</form>
				<Dialog
					title="Chọn các chủ đề cho sản phẩm"
					actions={dialogActions}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.handleCloseDialog}
					autoScrollBodyContent={true}
				>
					{categories.map(cate => 
						<Checkbox
							key={cate.categoryId}
							label={cate.name}
							style={style.checkbox}
							onCheck={() => this.handleCategoryCheck(cate.categoryId)}
							checked={categoryIdArr.indexOf(cate.categoryId) !== -1}
						/>
					)}
				</Dialog>
			</Paper>
		);
	}
}
