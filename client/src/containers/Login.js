import { Login } from '../components';
import { connect } from 'react-redux';
import { login } from '../actions/authenticate';

export default connect(null, {
	login
})(Login);
