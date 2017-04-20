import React, { Component } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import { Paper } from 'material-ui';
import style from './style';
import Item from './Item';
import SellerInfo from './SellerInfo';
import Comments from './Comments';
import Report from './Report';
import Loading from '../Loading';
import $ from 'jquery';

export default class ItemDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: null,
			comments: [],
			loadingComment: false
		}
		this.loadData = this.loadData.bind(this);
		this.handleComment = this.handleComment.bind(this);
		this.loadComment = this.loadComment.bind(this);
	}

	loadComment() {
		const productId = this.state.item.productId;
		this.setState({
			loadingComment: true
		});
		$.ajax({
			url: `/api/product/comment?productId=${productId}`,
			type: 'GET',
			success: response => {
				if (response.error === "OK") {
					this.setState({
						comments: response.data
					});
				} else {
					this.props.showSnackMessage('Đã có lỗi xảy ra khi tải bình luận');
				}
				this.setState({
					loadingComment: false
				})
			},
			error: xhr => {
				this.setState({
					loadingComment: false
				})
				console.log(xhr.responseText);
				this.props.showSnackMessage('Đã có lỗi xảy ra khi tải bình luận');
			}
		});
	}

	loadData() {
		const { products } = this.props;
		const productId = parseInt(this.props.match.params.id, 10);
		const item = products.find(product => product.productId === productId);
		if (item) {
			this.setState({item}, () => {
				this.loadComment();
			});
		} else {
			$.ajax({
				url: `/api/product/info/${productId}`,
				type: 'GET',
				success: response => {
					if (response.error === "OK") {
						this.setState({
							item: response.data
						});
						// Load comment
						this.loadComment();
					} else {
						this.props.push('/');
					}
				},
				error: xhr => {
					this.props.push('/');
				}
			});
		}
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate() {
		const productId = parseInt(this.props.match.params.id, 10);
		if (this.state.item.productId !== productId) {
			this.loadData();
		}
	}

	handleComment(cmt) {
		let url = "/api/product/guestuser/comment/add";
		const isLogged = this.props.user.userId ? true : false;
		if (isLogged) {
			url = "/api/product/user/comment/add";
		}
		this.setState({
			loadingComment: true
		});
		$.ajax({
			url,
			type: 'POST',
			data: {
				productId: this.state.item.productId,
				content: cmt
			},
			success: response => {
				if (response.error !== "OK") {
					return this.props.showSnackMessage('Đã có lỗi xảy ra');
				}
				const comments = this.state.comments.map(comment => {
					const nComment = Object.assign({}, comment);
					nComment.user = Object.assign({}, comment.user);
					return nComment;
				});
				comments.unshift(response.data);
				this.setState({comments});
				this.setState({
					loadingComment: false
				});
			},
			error: xhr => {
				console.log(xhr.responseText);
				this.props.showSnackMessage('Đã có lỗi xảy ra');
				this.setState({
					loadingComment: false
				});
			}
		});
	}

	render() {
		const { item } = this.state;
		return (
			this.state.item ? <Paper style={style.container} zDepth={1}>
				<div style={style.itemWrapper}>
					<Item 
						title={item.name}
						price={item.price}
						date={item.date}
						description={item.description}
						images={item.images.map(image => ({
							original: image,
							thumbnail: image
						}))}
					/>
					<Comments onSubmit={this.handleComment}
						comments={this.state.comments}
						loading={this.state.loadingComment}
					/>
				</div>
				<div style={style.sellerWrapper}>
					<SellerInfo 
						avatar={item.user.avatar}
						name={item.user.fullName}
						address={item.user.district.name + ' - ' + item.user.district.city.name}
						phone={item.user.phone}
					/>
					<Report
						onSubmit={content => {
							this.props.report({
								content,
								productId: item.productId
							});
						}}
					/>
				</div>
			</Paper>
			: <Loading />
		)
	}
}
