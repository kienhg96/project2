import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';

const style = {
	container: {
		padding: 30,
		margin: 30
	},
	title: {
		fontWeight: 500,
		textAlign: 'center'
	}
}

export default class CategoryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id || '',
			name: this.props.name || ''
		}
		this.handleIDChange = this.handleIDChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.name) {
			this.props.onSubmit(this.state);
		}
	}

	handleIDChange(e, id) {
		if (!isNaN(id) || id === '') {
			this.setState({id});
		}
	}

	handleNameChange(e, name) {
		this.setState({ name });
	}

	render() {
		return (
			<Paper zDepth={2} style={style.container}>
				<h1 style={style.title}>{this.props.title}</h1>
				<form onSubmit={this.handleSubmit}>
					<TextField
						floatingLabelText="ID"
						fullWidth={true}
						disabled={this.props.disableID}
						value={this.state.id}
						onChange={this.handleIDChange}
					/>
					<TextField
						floatingLabelText="Tên chủ đề"
						fullWidth={true}
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
					<RaisedButton label={this.props.submitLabel || "Gửi"}
						primary={true} type="submit"
						fullWidth={true}
					/>
				</form>
			</Paper>
		);
	}
}
