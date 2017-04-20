import React, { Component } from 'react';
import $ from 'jquery';
import Loading from '../Loading';
import ItemHorizontal from '../ItemHorizontal';
import { RaisedButton, Dialog, FlatButton } from 'material-ui';

const style = {
	container: {
		paddingBottom: 80
	},
	title: {
		fontWeight: 500,
		textAlign: 'center'
	},
	action: {
		marginRight: 10
	}
}

export default class MyProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: true,
			productId: null,
			openDialog: false
		};
		this.handleSoldAction = this.handleSoldAction.bind(this);
		this.handleSoldDialog = this.handleSoldDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
	}

	componentDidMount() {
		const user = this.props.user;
		if (!user.userId) {
			return this.props.push('/');
		}

		$.ajax({
			url: `/api/product?userId=${user.userId}`,
			type: 'GET',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						products: response.data,
						loading: false
					});
				} else {
					this.setState({
						loading: false
					});
					console.log(response);
					this.props.showSnackMessage('Đã có lỗi xảy a');	
				}
			},
			error: xhr => {
				this.setState({
					loading: false
				});
				console.log(xhr.responseText);
				this.props.showSnackMessage('Đã có lỗi xảy a');	
			}
		});
	}

	handleSoldAction(productId) {
		this.setState({
			productId,
			openDialog: true
		});
	}

	handleSoldDialog() {
		const {productId} = this.state;
		this.setState({
			openDialog: false
		});
		$.ajax({
			url: '/api/product/user',
			type: 'PUT',
			data: {
				productId: productId,
				isSold: 1
			},
			success: response => {
				if (response.error === "OK") {
					const products = this.state.products.map(product => {
						const nProduct = Object.assign({}, product);
						nProduct.categories = product.categories.map(category => Object.assign({}, category));
						nProduct.district = {
							name: product.district.name,
							districtId: product.district.districtId,
							city: Object.assign({}, product.district.city)
						};
						nProduct.images = product.images.map(image => image);
						nProduct.isSold =(product.productId === productId) ? 1 : product.isSold;
						return nProduct;
					});
					this.setState({products});
				} else {
					console.log(response);
					this.props.showSnackMessage('Đã có lỗi xảy a');	
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
				this.props.showSnackMessage('Đã có lỗi xảy a');	
			}
		})
	}

	handleCloseDialog() {
		this.setState({
			openDialog: false
		});
	}

	render() {
		const dialogActions = [
			<FlatButton
				label="Có"
				primary={true}
				onTouchTap={this.handleSoldDialog}
			/>,
			<FlatButton
				label="Không"
				keyboardFocused={true}
				primary={true}
				onTouchTap={this.handleCloseDialog}
			/>
		];

		return (
			<div  style={style.container} className="dashContainer">
				<h1 style={style.title}>Các sản phẩm đã đăng</h1>
				{this.state.loading && <Loading />}
				<div>
					{this.state.products.map(item => 
						<ItemHorizontal key={item.productId}
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
									onTouchTap={() => this.handleSoldAction(item.productId)}
								/>
							}
						/>
					)}
				</div>
				<Dialog
					title="Xác nhận"
					actions={dialogActions}
					modal={false}
					onRequestClose={this.handleCloseDialog}
					open={this.state.openDialog}
				>
					Bạn có chắc muốn đánh dấu sản phẩm này là đã bán? Hành động này không thể quay lại.
				</Dialog>
			</div>
		);
	}
}