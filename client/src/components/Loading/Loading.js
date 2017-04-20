import React from 'react';
import { CircularProgress } from 'material-ui';

const style = {
	container: {
		width: '100%',
		marginTop: 100,
		display: 'flex',
		justifyContent: 'center'
	}
}

export default () => (
	<div style={style.container}>
		<CircularProgress size={80} thickness={5} />
	</div>
);
