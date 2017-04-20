import { purple500 } from 'material-ui/styles/colors';

export default {
	container: {
		padding: 13,
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 5
	},
	imageWrapper: {
		flexBasis: 250,
		flexGrow: 0,
		flexShrink: 0,
		marginRight: 20,
		height: 200,
		width: 250
	},
	image: {
		borderRadius: 5,
		maxHeight: 200,
		maxWidth: 250,
		display: 'block',
		margin: '0 auto'
	},
	contentWrapper: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	title: {
		color: purple500,
		fontSize: 27,
		fontWeight: 500,
		paddingTop: 5
	},
	price: {
		color: '#e74c3c'
	},
	description: {
		marginTop: 10,
		flex: 1,
		fontSize: 15
	},
	headWrapper: {
		flexGrow: 0,
		flexShrink: 0
	},
	actionWrapper: {
		flexGrow: 0,
		flexShrink: 0,
		display: 'flex',
		justifyContent: 'space-between',
		borderTop: '1px solid rgb(214, 220, 224)',
		paddingTop: 10
	},
	date: {
		fontSize: 14,
		color: '#7f8c8d',
		lineHeight: '36px'
	}
}