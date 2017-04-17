import React, { Component } from 'react';
import { TextField } from 'material-ui';
import style from './style';

export default class Comments extends Component {
	render() {
		return (
			<div style={style.commentWrapper}>
				<TextField 
					floatingLabelText="Gửi một bình luận"
					fullWidth={true}
				/>
			</div>
		)
	}
}