import { Signup } from '../components';
import { connect } from 'react-redux';
import { signup } from '../actions/authenticate';

export default connect(state => ({
	cities: state.cities
}), {
	signup
})(Signup);
