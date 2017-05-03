import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Table, TableBody, TableHeader, 
		TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Tool from './Tool';

export default class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRow: null
		}
		this.handleRowSelected = this.handleRowSelected.bind(this);
		this.onDetail = this.onDetail.bind(this);
		this.onDeleteReport = this.onDeleteReport.bind(this);
		this.onDeletePost = this.onDeletePost.bind(this);
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

	onDeleteReport() {
		const reportId = this.props.reports[this.state.selectedRow].reportId;
		this.props.onDeleteReport(reportId);
	}

	onDeletePost() {
		const productId = this.props.reports[this.state.selectedRow].product.productId;
		this.props.onDeletePost(productId);
	}

	onDetail() {
		const reportId = this.props.reports[this.state.selectedRow].reportId;
		this.props.onDetail(reportId);
	}

	render() {
		const { reports } = this.props;
		return (
			<Paper zDepth={2}>
				<Tool selected={this.state.selectedRow !== null}
					onDeleteReport={this.onDeleteReport}
					onDeletePost={this.onDeletePost}
					onDetail={this.onDetail}
				/>
				<Table onRowSelection={this.handleRowSelected}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Report ID</TableHeaderColumn>
							<TableHeaderColumn>Tên sản phẩm</TableHeaderColumn>
							<TableHeaderColumn>Giá</TableHeaderColumn>
							<TableHeaderColumn>Nội dung</TableHeaderColumn>
							<TableHeaderColumn>Báo cáo</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody deselectOnClickaway={false}>
						{
							reports.map(report => 
								<TableRow key={report.reportId}>
									<TableRowColumn>{report.reportId}</TableRowColumn>
									<TableRowColumn>{report.product.name}</TableRowColumn>
									<TableRowColumn>{report.product.price}</TableRowColumn>
									<TableRowColumn>{report.product.description}</TableRowColumn>
									<TableRowColumn>{report.content}</TableRowColumn>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}
