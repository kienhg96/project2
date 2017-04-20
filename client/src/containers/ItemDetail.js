import { ItemDetail } from '../components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showSnackMessage } from '../actions/snack';
import { report } from '../actions/products';

export default connect(state => ({
	products: state.products,
	user: state.user
}), {
	push, showSnackMessage, report
})(ItemDetail);