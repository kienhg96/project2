import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifycation from '../../components/Notifycation';
import { closeNotifycation } from '../../actions/notifycation';

class App extends Component {
	render() {
		const { children, closeNotifycation } = this.props;
		const { show, content } = this.props.notifycation;
		return (
			<div>
				<div>{children}</div>
				<Notifycation show={show} content={content}
					closeInfo={closeNotifycation}
				/>
			</div>
		)
	}
}

export default connect(state => ({
	notifycation: state.notifycation
}), {
	closeNotifycation
})(App);