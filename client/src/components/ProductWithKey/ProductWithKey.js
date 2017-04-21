import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import $ from 'jquery';
import ItemHorizontal from '../ItemHorizontal';
import Loading from '../Loading';

const style = {
	container: {
		padding: 20
	},
	keyWrapper: {
		padding: 20
	},
	title: {
		fontWeight: 500
	},
	action: {
		marginRight: 10
	}
}

export default class ProductKey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: '',
			product: null,
			loading: false
		}
		this.hanldeKeyChange = this.hanldeKeyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSoldAction = this.handleSoldAction.bind(this);
	}

	hanldeKeyChange(e, key) {
		this.setState({key});
	}

	handleSubmit(e) {
		e.preventDefault();
		const key = this.state.key;
		this.setState({
			loading: true
		});
		$.ajax({
			url: `/api/product/info/${key}`,
			type: 'GET',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						product: response.data
					});
				} else {
					this.setState({
						product: 'none'
					});
				}
				this.setState({
					loading: false
				});
			},
			error: xhr => {
				console.log(xhr.responseText);
				this.setState({
					product: 'none',
					loading: false
				});
			}
		});
	}

	handleSoldAction() {
		const productKey = this.state.key;

		$.ajax({
			url: '/api/product/guestuser',
			type: 'PUT',
			data: {
				productKey: productKey,
				isSold: 1
			},
			success: response => {
				if (response.error === "OK") {
					const product = Object.assign({}, this.state.product);
					product.categories = [].concat(product.categories);
					product.district = Object.assign({}, product.district);
					product.district.city = Object.assign({}, product.district.city);
					product.images = [].concat(product.images);
					product.user = null;
					product.isSold = true;
					this.setState({product});
				} else {
					console.log(response);
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
			}
		})
	}

	render() {
		const item = this.state.product;
		return (
			<div style={style.container}>
				<Paper zDepth={1} style={style.keyWrapper}>
					<form onSubmit={this.handleSubmit}>
						<TextField
							floatingLabelText="Nhập mã của tin"
							fullWidth={true}
							value={this.state.key}
							onChange={this.hanldeKeyChange}
						/>
						<RaisedButton label="Tìm"
							primary={true}
							type="submit"
						/>
					</form>
				</Paper>
				{this.state.loading && <Loading />}
				{item && (
					item === 'none' ? 
					<Paper zDepth={1} style={style.keyWrapper}>
						<h2 style={style.title}>Không tìm thấy sản phẩm</h2>
					</Paper> :
					<ItemHorizontal
						title={item.name}
						price={item.price}
						date={item.date}
						address={item.district.name + ' - ' + item.district.city.name}
						description={item.description}
						image={item.images[0]}
						url={"/detail/" + item.productId}
						action={
							<RaisedButton
								style={style.action}
								label={item.isSold ? "Đã bán" : "Đánh dấu đã bán"} 
								secondary={true}
								disabled={item.isSold ? true : false}
								onTouchTap={this.handleSoldAction}
							/>
						}
					/>
				)}
			</div>
		);
	}
}
