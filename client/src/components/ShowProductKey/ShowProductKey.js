import React from 'react';
import { Paper } from 'material-ui';

const style = {
	container: {
		margin: 10,
		padding: 20
	},
	title: {
		fontWeight: 500,
		textAlign: 'center'
	},
	content: {
		textAlign: 'center'
	}
}

export default ({productKey}) => 
	<Paper style={style.container}>
		<h2 style={style.title}>Mã số sản phẩm vừa đăng</h2>
		<h1 style={style.content}>{productKey}</h1>
	</Paper>