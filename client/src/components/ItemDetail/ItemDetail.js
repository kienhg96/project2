import React, { Component } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import { Paper } from 'material-ui';
import style from './style';
import Item from './Item';
import SellerInfo from './SellerInfo';
import Comments from './Comments';
import Report from './Report';
import Loading from '../Loading';
import $ from 'jquery';

export default class ItemDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: null
		}
		this.loadData = this.loadData.bind(this);
	}

	loadData() {
		const {items} = this.props;
		const productId = parseInt(this.props.match.params.id, 10);
		const item = items.find(product => product.productId === productId);
		if (item) {
			this.setState({item});
		} else {
			$.ajax({
				url: `/api/product/info/${productId}`,
				type: 'GET',
				success: response => {
					if (response.error === "OK") {
						this.setState({
							item: response.data
						});
					}
				},
				error: xhr => {
					this.props.push('/');
				}
			});
		}
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate() {
		const productId = parseInt(this.props.match.params.id, 10);
		if (this.state.item.productId !== productId) {
			this.loadData();
		}
	}

	render() {
		const { item } = this.state;
		return (
			this.state.item ? <Paper style={style.container} zDepth={1}>
				<div style={style.itemWrapper}>
					<Item 
						title={item.name}
						price={item.price}
						date={item.date}
						description={item.description}
						images={item.images.map(image => ({
							original: image,
							thumbnail: image
						}))}
					/>
					<Comments />
				</div>
				<div style={style.sellerWrapper}>
					<SellerInfo 
						avatar={item.user.avatar}
						name={item.user.fullName}
						address={item.user.district.name + ' - ' + item.user.district.city.name}
						phone={item.user.phone}
					/>
					<Report/>
				</div>
			</Paper>
			: <Loading />
		)
	}
}
