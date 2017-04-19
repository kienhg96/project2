import { Dash } from '../components';
import { connect } from 'react-redux';
import { getItems } from '../actions/items';

export default connect(state => ({
	items: state.items
}), {
	getItems
})(Dash);