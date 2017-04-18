import React, { Component } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import { Paper } from 'material-ui';
import style from './style';
import Item from './Item';
import SellerInfo from './SellerInfo';
import Comments from './Comments';
import Report from './Report';

const images = [
	{
		original: 'http://lorempixel.com/1000/600/nature/1/',
		thumbnail: 'http://lorempixel.com/250/150/nature/1/',
	},
	{
		original: 'http://lorempixel.com/1000/600/nature/2/',
		thumbnail: 'http://lorempixel.com/250/150/nature/2/'
	},
	{
		original: 'http://lorempixel.com/1000/600/nature/3/',
		thumbnail: 'http://lorempixel.com/250/150/nature/3/'
	}
]

import test from './test';

export default class ItemDetail extends Component {
	render() {
		return (
			<Paper style={style.container} zDepth={1}>
				<div style={style.itemWrapper}>
					<Item 
						title="Muốn bán đồ đạc"
						price="1.200.000 đ"
						date="12/04/2017"
						description={test}
						images={images}
					/>
					<Comments />
				</div>
				<div style={style.sellerWrapper}>
					<SellerInfo avatar="https://pickaface.net/gallery/avatar/myspacedixson5247bbe83039a.png"
						name="Hoàng Văn Kiên"
						address="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
						phone="0123456789"
					/>
					<Report/>
				</div>
			</Paper>
		)
	}
}
