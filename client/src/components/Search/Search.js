import React, { Component } from 'react';
import $ from 'jquery';
import ItemHorizontal from '../ItemHorizontal';

const style = {
	container: {
		paddingBottom: 80
	}
}

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			products: []
		}
		this.loadData = this.loadData.bind(this);
	}

	loadData() {
		const query = this.props.match.params.query;
		$.ajax({
			url: `/api/product?name=${query}`,
			type: 'GET',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						products: response.data
					});
				} else {
					console.log(response);
					this.props.showSnackMessage('Đã có lỗi xảy ra');
				}
			},
			error: xhr => {
				console.log(xhr.responseText);
				this.props.showSnackMessage('Đã có lỗi xảy ra');
			}
		})
	}

	componentDidUpdate() {
		const query = this.props.match.params.query;
		if (query !== this.state.query) {
			this.setState({query}, () => {
				this.loadData();
				console.log('Reload data');
			});
		}
	}

	componentDidMount() {
		const query = this.props.match.params.query;
		if (query !== this.state.query) {
			this.setState({query}, () => {
				this.loadData();
				console.log('Reload data');
			});
		}
	}

	render() {
		return (
			<div className="dashContainer" style={style.container}>
				{this.state.products.map(item =>
					<ItemHorizontal key={item.productId}
						title={item.name}
						price={item.price}
						date={item.date}
						address={item.district.name + ' - ' + item.district.city.name}
						description={item.description}
						image={item.images[0]}
						url={"/detail/" + item.productId}
					/>
				)}
			</div>
		)
	}
}