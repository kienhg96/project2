import React, { Component } from 'react';
import { Paper } from 'material-ui';
import style from './style';
import Image from './Image';
import Content from './Content';

const url200x200 = "https://placeholdit.imgix.net/~text?txtsize=14&bg=dc143c&txtclr=ffffff&txt=250%C3%97200&w=250&h=200";

export default class ItemHorizontal extends Component {
	render() {
		return (
			<Paper zDepth={1} style={style.container}>
				<Image src={url200x200} />
				<Content 
					title="Sản phẩm muốn bán"
					price="5.800.000 đ"
					date="12/04/2017"
					address="Quận Hai Bà Trưng"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna massa, condimentum ac leo vitae, blandit bibendum sem. Suspendisse volutpat tortor ..."
					detailOnClick={() => console.log('Clicked')}
				/>
			</Paper>
		)
	}
}