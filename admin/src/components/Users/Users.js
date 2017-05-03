import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Table, TableBody, TableHeader, 
		TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Tool from './Tool';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRow: null
		}
		this.handleRowSelected = this.handleRowSelected.bind(this);
		this.onDeleteUser = this.onDeleteUser.bind(this);
	}

	handleRowSelected(value) {
		if (value[0] === undefined) {
			this.setState({
				selectedRow: null
			});
		} else {
			this.setState({
				selectedRow: value[0]
			});
		}
	}

	onDeleteUser() {
		const userId = this.props.users[this.state.selectedRow].userId;
		this.props.onDeleteUser(userId);
	}

	render() {
		const { users } = this.props;
		return (
			<Paper zDepth={2}>
				<Tool 
					selected={this.state.selectedRow !== null}
					onDeleteUser={this.onDeleteUser}
				/>
				<Table onRowSelection={this.handleRowSelected}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>User ID</TableHeaderColumn>
							<TableHeaderColumn>Tên</TableHeaderColumn>
							<TableHeaderColumn>điện thoại</TableHeaderColumn>
							<TableHeaderColumn>Email</TableHeaderColumn>
							<TableHeaderColumn>Quận/Huyện</TableHeaderColumn>
							<TableHeaderColumn>Thành phố/Tỉnh</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody deselectOnClickaway={false}>
						{
							users.map(user => 
								<TableRow key={user.userId}>
									<TableRowColumn>{user.userId}</TableRowColumn>
									<TableRowColumn>{user.fullName}</TableRowColumn>
									<TableRowColumn>{user.phone}</TableRowColumn>
									<TableRowColumn>{user.email}</TableRowColumn>
									<TableRowColumn>{user.district.name}</TableRowColumn>
									<TableRowColumn>{user.district.city.name}</TableRowColumn>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}
