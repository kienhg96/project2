import React, { Component } from 'react';
import { Drawer, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';

export default class LeftDrawer extends Component {
	render() {
		return (
			<Drawer open={this.props.open} containerStyle={{ paddingTop: 60 }}>
				<Link to="/report">
					<MenuItem>Xem báo cáo</MenuItem>
				</Link>
				<Link to="/user">
					<MenuItem>Người dùng</MenuItem>
				</Link>
				<Link to="/category">
					<MenuItem>Chủ đề</MenuItem>
				</Link>
			</Drawer>
		)
	}
}
