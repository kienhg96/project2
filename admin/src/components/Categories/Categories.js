import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Table, TableBody, TableHeader, 
		TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Tool from './Tool';

export default class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRow: null
		}
		this.handleRowSelected = this.handleRowSelected.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
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

	handleDelete() {
		this.props.onDeleteClick(this.props.categories[this.state.selectedRow].categoryId);
	}

	handleEdit() {
		this.props.onEditClick(this.props.categories[this.state.selectedRow].categoryId);
	}

	render() {
		const { categories } = this.props;
		return (
			<Paper zDepth={2}>
				<Tool selected={this.state.selectedRow !== null}
					onEdit={this.handleEdit}
					onDelete={this.handleDelete}
				/>
				<Table onRowSelection={this.handleRowSelected}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Tên</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody deselectOnClickaway={false}>
						{
							categories.map(category => 
								<TableRow key={category.categoryId}>
									<TableRowColumn>{category.categoryId}</TableRowColumn>
									<TableRowColumn>{category.name}</TableRowColumn>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}