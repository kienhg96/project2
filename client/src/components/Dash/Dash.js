import React, { Component } from 'react';
import ItemHorizontal from '../ItemHorizontal';
import Loading from '../Loading';
import Pagination from './Pagination';

import './style.css';

const style = {
	container: {
		paddingBottom: 80
	}
}

// function getQueryVariable(search, variable) {
//     const query = search.substring(1);
//     const vars = query.split('&');
//     for (let i = 0; i < vars.length; i++) {
//         const pair = vars[i].split('=');
//         if (decodeURIComponent(pair[0]) === variable) {
//             return decodeURIComponent(pair[1]);
//         }
//     }
//     return null;
// }

export default class Dash extends Component {
	constructor(props) {
		super(props);
		this.handlePageChage = this.handlePageChage.bind(this);
	}

	handlePageChage(page) {
		if (page - 1 !== this.props.page.current) {
			this.props.getProducts(page - 1);
		}
	}

	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const { products } = this.props;
		return (
			<div style={style.container} className="dashContainer">
			{
				this.props.loading ? 
				<Loading />
				: (products.length === 0 ? <div>Chưa có dữ liệu</div> :
					products.map(item => 
					<ItemHorizontal key={item.productId}
						title={item.name}
						price={item.price}
						date={item.date}
						address={item.district.name + ' - ' + item.district.city.name}
						description={item.description}
						image={item.images[0]}
						url={"/detail/" + item.productId}
					/>
				))
			}
			<Pagination
				style={{
					textAlign: 'center'
				}}
				total={10}
				current={this.props.page.current + 1}
				display={10}
				onChange={this.handlePageChage}
			/>
			</div>
		)
	}
}
