import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';

const style = {
	title: {
		color: '#000',
		marginLeft: 20
	}
}

export default (props) => (
	<Toolbar>
		<ToolbarGroup firstChild={true}>
			<ToolbarTitle text="Quản lý thể loại" style={style.title}/>
		</ToolbarGroup>
		<ToolbarGroup>
			<RaisedButton label="Xóa chủ đề" primary={true} disabled={!props.selected}
				onTouchTap={props.onDelete}
			/>
			<RaisedButton label="Sửa chủ đề" secondary={true}  disabled={!props.selected}
				onTouchTap={props.onEdit}
			/>
			<Link to="/category/new">
				<RaisedButton label="Thêm chủ đề" backgroundColor="#27ae60" 
					labelColor="#fff"
				/>
			</Link>
		</ToolbarGroup>
	</Toolbar>
)