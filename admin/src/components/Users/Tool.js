import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { RaisedButton } from 'material-ui';

const style = {
	title: {
		color: '#000',
		marginLeft: 20
	}
}

export default (props) => (
	<Toolbar>
		<ToolbarGroup firstChild={true}>
			<ToolbarTitle text="Quản lý người dùng" style={style.title}/>
		</ToolbarGroup>
		<ToolbarGroup>
			<RaisedButton label="Xóa người dùng" primary={true} disabled={!props.selected}
				onTouchTap={props.onDeleteUser}
			/>
		</ToolbarGroup>
	</Toolbar>
)