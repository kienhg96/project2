import React from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router-dom';

const style = {
	container: {
		position: 'fixed',
		bottom: 30,
		right: 30,
		zIndex: 2
	}
}

export default () => (
	<div style={style.container}>
		<Link to="/add">
			<FloatingActionButton backgroundColor="#2ecc71">
				<ContentAdd />
			</FloatingActionButton>
		</Link>
	</div>
);
