import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Login } from '../components';
import { adminLogin } from '../actions/admin';
import { push } from 'react-router-redux';

const style = {
	container: {
		marginTop: 80
	}
}

const Admin = (props) => {
	return (
		<Switch>
			<Route exact path="/admin/login" render={() => 
				<div style={style.container}>
					<Login login={props.adminLogin}
						titleText={"Đăng nhập ADMIN"}
						usernameText={"Tài khoản"}
					/>
				</div>
			}/>
			<Route exact path="/admin" render={() => 
				<div style={style.container}>
					Hi
				</div>
			}/>
		</Switch>
	)
}

export default connect(state => ({
	admin: state.admin,
}), {
	adminLogin,
	push
})(Admin);
