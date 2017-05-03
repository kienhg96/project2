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
			<ToolbarTitle text="Quản lý báo cáo" style={style.title}/>
		</ToolbarGroup>
		<ToolbarGroup>
			<RaisedButton label="Xóa báo cáo" primary={true} disabled={!props.selected}
				onTouchTap={props.onDeleteReport}
			/>
			<RaisedButton label="Xóa tin đăng" secondary={true}  disabled={!props.selected}
				onTouchTap={props.onDeletePost}
			/>
			<RaisedButton label="Xem chi tiết" backgroundColor="#27ae60" 
				labelColor="#fff" disabled={!props.selected}
				onTouchTap={props.onDetail}
			/>
		</ToolbarGroup>
	</Toolbar>
)