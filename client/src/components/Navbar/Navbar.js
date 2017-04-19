import React, { Component } from 'react';
import { AppBar, IconButton, TextField, IconMenu, MenuItem } from 'material-ui';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

const style = {
	icon: {
		color: '#fff'
	},
	title: {
		color: '#fff',
		fontSize: 25,
		marginLeft: 10
	},
	toolbar: {
		height: '100%'
	},
	searchWrapper: {
	    backgroundColor: '#9b59b6',
	    margin: 10,
	    paddingLeft: 20,
	    paddingRight: 20,
	    borderRadius: 3,
	    flex: 1,
	    display: 'flex',
    	alignItems: 'center'
	}
}

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	}

	handleSearchChange(e, search) {
		this.setState({search});
	}

	handleSearchSubmit(e) {
		e.preventDefault();
		console.log('Submit', this.state.search);
	}

	handleLogoutClick() {
		this.props.logout();
	}

	render() {
		const MenuLogged = () => (
			<IconMenu iconButtonElement={
				<IconButton style={style.icon}>
					<i className="material-icons">more_vert</i>
				</IconButton>
			}>
				<MenuItem primaryText="Đăng xuất" onTouchTap={this.handleLogoutClick}/>
			</IconMenu>
		);
		const MenuNotLogged = () => (
			<IconMenu iconButtonElement={
				<IconButton style={style.icon}>
					<i className="material-icons">more_vert</i>
				</IconButton>
			}>
				<Link to="/login"><MenuItem primaryText="Đăng nhập"/></Link>
				<Link to="/signup"><MenuItem primaryText="Đăng ký"/></Link>
			</IconMenu>
		);

		return (
			<AppBar
				style={{ flexDirection: 'row' }}
				iconStyleRight={{ marginTop: 0 }}
				iconStyleLeft={{ marginTop: 0, flex: 1 }}
				titleStyle={{ display: 'none' }}
				iconElementLeft={
					<ToolbarGroup style={style.toolbar}>
						<IconButton style={style.icon}>
							<i className="material-icons">menu</i>
						</IconButton>
						<Link to="/"><ToolbarTitle text="My App" style={style.title}/></Link>
						<form style={style.searchWrapper} onSubmit={this.handleSearchSubmit}>
							<i style={{color:'#fff'}} className="material-icons">search</i>
							<TextField
								underlineShow={false}
								inputStyle={{color: '#fff', paddingLeft: 10}}
								fullWidth={true}
								value={this.state.search}
								onChange={this.handleSearchChange}
								name="search"
								hintText="Tìm kiếm"
								hintStyle={{color: '#ecf0f1', marginLeft: 12}}
								onFocus={e => {
									if (e.target.value) {
										e.target.select();
									}
								}}
							/>
						</form>
					</ToolbarGroup>
				}
				iconElementRight={
					<ToolbarGroup style={style.toolbar}>
						{this.props.isLogged ? <MenuLogged /> : <MenuNotLogged />}
					</ToolbarGroup>
				}
			/>
		)
	}
}
