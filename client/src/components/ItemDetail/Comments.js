import React, { Component } from 'react';
import { TextField, LinearProgress  } from 'material-ui';
import style from './style';

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
		if (this.state.comment) {
			this.props.onSubmit(this.state.comment);
			this.setState({
				comment: ''
			});
		}
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
				{this.props.loading && <LinearProgress mode="indeterminate" 
				style={{
					backgroundColor: '#ecf0f1'
				}}/>}
				<CommentList list={this.props.comments.map(cmt => ({
					commentId: cmt.commentId,
					date: cmt.dateTime,
					username: cmt.user.fullName,
					content: cmt.content
				}))}/>
			</div>
		);
	}
}