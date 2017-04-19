import React, { Component } from 'react';
import { TextField } from 'material-ui';
import style from './style';

const commentList = [{
	commentId: 1,
	date: '2017/04/17',
	content: 'Cái này hay',
	username: 'anonymous'
},{
	commentId: 2,
	date: '2017/04/18',
	content: 'Cái này tốt',
	username: 'Hoàng Kiên'
},{
	commentId: 3,
	date: '2017/05/18',
	content: 'Cái này bán chưa',
	username: 'Kiên Hoang'
}];

const CommentList = ({list}) => (
	<div>
		{list.map(comment => (
			<div key={comment.commentId} style={style.txtCmtWrapper}>
				<span style={style.cmtDate}>
					{comment.date}
				</span>
				<span style={style.cmtUser}>
					{comment.username}
				</span>
				{": "}
				<span style={style.cmtContent}>
					{comment.content}
				</span>
			</div>
		))}
	</div>
)

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ''
		}
		this.handleCmtSubmit = this.handleCmtSubmit.bind(this);
		this.handleCmtChange = this.handleCmtChange.bind(this);
	}

	handleCmtChange(e, comment) {
		this.setState({comment});
	}

	handleCmtSubmit(e) {
		e.preventDefault();
		console.log('Submit', this.state.comment);
	}
	
	render() {
		return (
			<div style={style.commentWrapper}>
				<form onSubmit={this.handleCmtSubmit}>
					<TextField
						floatingLabelText="Gửi một bình luận"
						fullWidth={true}
						value={this.state.comment}
						onChange={this.handleCmtChange}
					/>
				</form>
				<CommentList list={commentList}/>
			</div>
		)
	}
}