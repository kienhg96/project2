import React, { Component } from 'react';
import { AppBar, IconButton, TextField, IconMenu, MenuItem,
		Divider } from 'material-ui';
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
	},
	menuItem: {
		paddingLeft: 55
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
		this.handleLeftIconClick = this.handleLeftIconClick.bind(this);
	}

	handleSearchChange(e, search) {
		this.setState({search});
	}

	handleSearchSubmit(e) {
		e.preventDefault();
		if (this.state.search) {
			this.props.onSearchSubmit(this.state.search);
		}
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
				<Link to="/myproducts"><MenuItem primaryText="Các tin đã đăng" 
					leftIcon={<i className="material-icons">monetization_on</i>}
					innerDivStyle={style.menuItem}
				/></Link>
				<Link to="/info"><MenuItem primaryText="Thông tin người dùng" 
					leftIcon={<i className="material-icons">info</i>}
					innerDivStyle={style.menuItem}
				/></Link>
				<Divider />
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
				<Link to="/signup"><MenuItem primaryText="Đăng ký"
					leftIcon={<i className="material-icons">person_add</i>}
					innerDivStyle={style.menuItem}
				/></Link>
				<Divider />
				<Link to="/product"><MenuItem primaryText="Tin đã đăng" 
					leftIcon={<i className="material-icons">monetization_on</i>}
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
