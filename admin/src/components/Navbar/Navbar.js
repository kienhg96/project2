import React, { Component } from 'react';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
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
		height: '100%',
		justifyContent: 'flex-start'
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
	},
	menuItem: {
		paddingLeft: 55
	}
}

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleLeftIconClick = this.handleLeftIconClick.bind(this);
	}

	handleLogoutClick() {
		this.props.logout();
	}

	handleLeftIconClick() {
		this.props.onLeftIconClick();
	}

	render() {
		const MenuLogged = () => (
			<IconMenu iconButtonElement={
				<IconButton style={style.icon}>
					<i className="material-icons">more_vert</i>
				</IconButton>
			}>
				<MenuItem primaryText="Đăng xuất" onTouchTap={this.handleLogoutClick}
					leftIcon={<i className="material-icons">exit_to_app</i>}
					innerDivStyle={style.menuItem}
				/>
			</IconMenu>
		);
		const MenuNotLogged = () => (
			<IconMenu iconButtonElement={
				<IconButton style={style.icon}>
					<i className="material-icons">more_vert</i>
				</IconButton>
			}>
				<Link to="/login"><MenuItem primaryText="Đăng nhập"
					leftIcon={<i className="material-icons">input</i>}
					innerDivStyle={style.menuItem}
				/></Link>
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
						<IconButton style={style.icon} onTouchTap={this.handleLeftIconClick}>
							<i className="material-icons">menu</i>
						</IconButton>
						<Link to="/">
							<ToolbarTitle text="My App" style={style.title}/>
						</Link>
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
