import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import { FlatButton, Dialog } from 'material-ui';

import $ from 'jquery';
import './style.css';

import Login from '../Login';
import Report from '../Report';
import Navbar from '../Navbar';
import LeftDrawer from '../LeftDrawer';
import ReportDetail from '../ReportDetail';
import Loading from '../Loading';
import Users from '../Users';
import Categories from '../Categories';
import CategoryForm from '../CategoryForm';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			reports: [],
			cities: [],
			action: '',
			selectedId: null,
			showDialog: false,
			loading: false,
			showDrawer: this.props.user.username ? true : false,
			users: [],
			categories: []
		}
		this.history = createHashHistory();
		this.onSubmitLogin = this.onSubmitLogin.bind(this);
		this.getReports = this.getReports.bind(this);
		this.getCities = this.getCities.bind(this);
		this.handleDetail = this.handleDetail.bind(this);
		this.handleDeleteReport = this.handleDeleteReport.bind(this);
		this.handleDeletePost = this.handleDeletePost.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);
		this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
		this.handleToggerDrawer = this.handleToggerDrawer.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
		this.handleEditCategory = this.handleEditCategory.bind(this);
		this.handleEditCategorySubmit = this.handleEditCategorySubmit.bind(this);
	}

	componentWillMount() {
		const { user } = this.props;
		const { history } = this;
		if (!user.username && history.location.pathname !== '/login') {
			this.history.push('/login');
		}
		this.getReports();
		this.getCities();
		this.getUsers();
		this.getCategories();
	}

	onSubmitLogin(value) {
		$.ajax({
			url: '/api/admin/login',
			type: 'POST',
			data: value,
			success: response => {
				if (response.error === "OK") {
					this.setState({
						user: response.data,
						showDrawer: true
					}, () => {
						this.getReports();
					});
					this.history.push('/');
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
			}
		});
	}

	getReports() {
		if (this.state.user.username) {
			$.ajax({
				type: 'GET',
				url: '/api/admin/getReport',
				success: response => {
					if (response.error === "OK") {
						this.setState({
							reports: response.data
						});
					} else {
						this.history.push('/login');
					}
				},
				error: xhr => {
					this.history.push('/login');
				}
			});
		}
	}

	getCities() {
		$.ajax({
			type: 'GET',
			url: '/api/city',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						cities: response.data
					});
				}
			}
		});
	}

	getUsers() {
		$.ajax({
			type: 'GET',
			url: '/api/admin/getUsers',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						users: response.data
					});
				} else {
					console.log(response);
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
			}
		})
	}

	getCategories() {
		$.ajax({
			type: 'GET',
			url: '/api/admin/getCategories',
			success: response => {
				if (response.error === 'OK') {
					this.setState({
						categories: response.data
					});
				} else {
					console.log(response);
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
			}
		})
	}

	handleDetail(reportId) {
		this.history.push(`/report/${reportId}`);
	}

	handleDeleteReport(reportId) {
		this.setState({
			action: 'DELETE_REPORT',
			selectedId: reportId,
			showDialog: true
		});
	}

	handleDeletePost(productId) {
		this.setState({
			action: 'DELETE_PRODUCT',
			selectedId: productId,
			showDialog: true
		});
	}

	handleDialogClose() {
		this.setState({
			showDialog: false
		});
	}

	handleDialogSubmit() {
		this.setState({
			showDialog: false
		});
		if (this.state.action === "DELETE_PRODUCT") {
			const productId = this.state.selectedId;
			$.ajax({
				url: '/api/admin/deleteProduct',
				type: 'POST',
				data: { productId },
				success: response => {
					if (response.error === "OK") {
						const index = this.state.reports.map(report => report.product.productId).indexOf(productId);
						const reports = [...this.state.reports];
						reports.splice(index, 1);
						this.setState({ reports });
					} else {
						console.log(response);
					}
				},
				error: xhr => {
					console.log(xhr.responseText);
				}
			});
		} else if (this.state.action === "DELETE_REPORT") {
			const reportId = this.state.selectedId;
			$.ajax({
				url: '/api/admin/deleteReport',
				type: 'POST',
				data: { reportId },
				success: response => {
					if (response.error === "OK") {
						const index = this.state.reports.map(report => report.reportId).indexOf(reportId);
						const reports = [...this.state.reports];
						reports.splice(index, 1);
						this.setState({ reports });
					} else {
						console.log(response);
					}
				},
				error: xhr => {
					console.log(xhr.responseText);
				}
			});
		} else if (this.state.action === "DELETE_USER") {
			const userId = this.state.selectedId;
			$.ajax({
				url: '/api/admin/deleteUser',
				type: 'POST',
				data: { userId },
				success: response => {
					if (response.error === "OK") {
						const index = this.state.users.map(user => user.userId).indexOf(userId);
						const users = [...this.state.users];
						users.splice(index, 1);
						this.setState({ users });
					} else {
						console.log(response);
					}
				},
				error: xhr => {
					console.log(xhr.responseText);
				}
			})
		} else if (this.state.action === "DELETE_CATEGORY") {
			const categoryId = this.state.selectedId;
			$.ajax({
				url: '/api/admin/deleteCategory',
				type: 'POST',
				data: { categoryId },
				success: response => {
					if (response.error === "OK") {
						const categories = [...this.state.categories];
						const index = categories.map(c => c.categoryId).indexOf(categoryId);
						categories.splice(index, 1);
						this.setState({ categories });
					} else {
						console.log(response);
					}
				},
				error: xhr => {
					console.log(xhr.responseText);
				}
			})
		} else {
			console.log('Not in list');
		}
	}

	handleToggerDrawer() {
		this.setState({
			showDrawer: !this.state.showDrawer
		});
	}

	contentSwitch(content) {
		switch (content) {
			case 'DELETE_PRODUCT':
				return 'tin đăng';
			case 'DELETE_REPORT':
				return 'báo cáo';
			case 'DELETE_USER':
				return 'người dùng';
			case 'DELETE_CATEGORY':
				return 'thể loại';
			default:
				return '';
		}
	}

	handleDeleteUser(userId) {
		this.setState({
			action: 'DELETE_USER',
			selectedId: userId,
			showDialog: true
		});
	}

	handleLogout() {
		$.ajax({
			url: '/api/admin/logout',
			type: 'GET',
			success: response => {
				this.setState({
					user: {},
					showDrawer: false
				}, () => {
					this.history.push('/login');
				})
			},
			error: xhr => {
				this.setState({
					user: {},
					showDrawer: false
				}, () => {
					this.history.push('/login');
				});
				console.log(xhr.responseText);
			}
		});
	}

	handleAddCategory(value) {
		$.ajax({
			url: '/api/admin/addCategory',
			type: 'POST',
			data: {
				categoryName: value.name
			},
			success: response => {
				if (response.error === "OK") {
					const categories = [...this.state.categories];
					categories.push(response.data);
					this.setState({categories});
					this.history.push('/category');
				} else {
					console.log(response);
				}
			},
			error: xhr => {
				const response = JSON.parse(xhr.responseText);
				if (response.error === "CATEGORY_EXIST") {
					alert('Tên chủ đề đã tồn tại');
				}
			}
		})
	}

	handleDeleteCategory(categoryId) {
		this.setState({
			action: 'DELETE_CATEGORY',
			selectedId: categoryId,
			showDialog: true
		});
	}

	handleEditCategory(categoryId) {
		this.history.push(`/category/${categoryId}`);
	}

	handleEditCategorySubmit(value) {
		$.ajax({
			url: '/api/admin/editCategory',
			type: 'POST',
			data: {
				categoryId: value.id,
				name: value.name
			},
			success: response => {
				if (response.error === "OK") {
					const category = response.data;
					category.categoryId = parseInt(category.categoryId, 10);
					const categories = [...this.state.categories];
					const index = categories.map(c => c.categoryId).indexOf(category.categoryId);
					categories[index] = category;
					this.setState({categories});
					this.history.push('/category');
				} else {
					console.log(response);
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
			}
		})
	}

	render() {
		const dialogActions = [
			<FlatButton 
				label="Không"
				primary={true}
				onTouchTap={this.handleDialogClose}
				keyboardFocused={true}
			/>,
			<FlatButton
				label="Có"
				primary={true}
				onTouchTap={this.handleDialogSubmit}
			/>
		];

		return (
			<div>
				<Router history={this.history}>
					<div>
						<div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1301 }}>
							<Navbar isLogged={this.state.user.username}
								onLeftIconClick={this.handleToggerDrawer}
								logout={this.handleLogout}
							/>
						</div>
						<LeftDrawer open={this.state.showDrawer}/>
						<div style={{ marginTop: 60, marginLeft: this.state.showDrawer ? 256 : 0 }} className="content">
							<Switch>
								<Route exact path="/login" render={() =>
									<Login login={this.onSubmitLogin}/>
								}/>
								<Route path="/" render={() => 
									<Switch>
										<Route exact path="/" render={() => 
											<div>Home</div>
										}/>
										<Route exact path="/report" render={() =>
											<Report reports={this.state.reports}
												onDetail={this.handleDetail}
												onDeleteReport={this.handleDeleteReport}
												onDeletePost={this.handleDeletePost}
											/>
										}/>
										<Route exact path="/report/:id" render={({match}) => {
											const id = match.params.id;
											if (isNaN(id)) {
												return <Redirect to="/report" />
											}
											const report = this.state.reports.find(report => report.reportId === parseInt(id, 10));
											if (!report) {
												return <Redirect to="/report" />
											}
											return (
												<ReportDetail report={report}
													onDeleteReport={this.handleDeleteReport}
													onDeletePost={this.handleDeletePost}
												/>
											)
										}}/>
										<Route exact path="/user" render={() => 
											<Users users={this.state.users}
												onDeleteUser={this.handleDeleteUser}
											/>
										}/>
										<Route exact path="/category" render={() => 
											<Categories categories={this.state.categories}
												onDeleteClick={this.handleDeleteCategory}
												onEditClick={this.handleEditCategory}
											/>
										} />
										<Route exact path="/category/new" render={() =>
											<CategoryForm 
												title="Thêm thể loại"
												disableID={true}
												submitLabel="Thêm"
												onSubmit={this.handleAddCategory}
											/>
										}/>
										<Route exact path="/category/:id" render={({match}) => {
											let categoryId;
											const { categories } = this.state;
											try {
												categoryId = parseInt(match.params.id, 10);
											} catch (err) {
												return <Redirect to="/category"/>
											}
											const category = categories.find(c => c.categoryId === categoryId);
											if (!category) {
												return <Redirect to="/category"/>
											}
											return <CategoryForm 
												title="Sửa thể loại"
												disableID={true}
												submitLabel="Cập nhật"
												id={category.categoryId}
												name={category.name}
												onSubmit={this.handleEditCategorySubmit}
											/>
										}}/>
									</Switch>
								}/>
							</Switch>
						</div>
					</div>
				</Router>
				<Dialog
					title="Xác nhận"
					actions={dialogActions}
					modal={false}
					open={this.state.showDialog}
					onRequestClose={this.handleDialogClose}
				>
					Bạn có chắc muốn xóa {this.contentSwitch(this.state.action)} này không
				</Dialog>
				{ this.state.loading && <Loading /> }
			</div>
		)
	}
}
