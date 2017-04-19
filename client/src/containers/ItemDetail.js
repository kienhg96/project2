import { ItemDetail } from '../components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default connect(state => ({
	items: state.items
}), {
	push
})(ItemDetail);