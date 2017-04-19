import React, { Component } from 'react';
import ItemHorizontal from '../ItemHorizontal';
import Loading from '../Loading';

import './style.css';

const style = {
	container: {
		paddingBottom: 80
	}
}

export default class Dash extends Component {
	
	componentDidMount() {
		this.props.getItems();
	}

	render() {
		const { items } = this.props;
		return (
			<div style={style.container} className="dashContainer">
			{
				items.length === 0 ? 
				<Loading />
				:items.map(item => 
					<ItemHorizontal key={item.productId}
						title={item.name}
						price={item.price}
						date={item.date}
						address={item.district.name + ' - ' + item.district.city.name}
						description={item.description}
						image={item.images[0]}
						url={"/detail/" + item.productId}
					/>
				)
			}
			</div>
		)
	}
}
