import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Login } from '../components';
import { adminLogin } from '../actions/admin';

const Admin = (props) => 
	<Switch>
		<Route exact path="/admin/login" render={() => 
			<div style={{marginTop: 80}}>
				<Login login={props.adminLogin}
					titleText={"Đăng nhập ADMIN"}
					usernameText={"Tài khoản"}
				/>
			</div>
		}/>
		<Route exact path="/admin" render={() => 
			<div>
				Hi
			</div>
		}/>
	</Switch>

export default connect(state => ({

}), {
	adminLogin
})(Admin);
