import { Dash } from '../components';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';

export default connect(state => ({
	products: state.products,
	page: state.page,
	loading: state.loading
}), {
	getProducts
})(Dash);