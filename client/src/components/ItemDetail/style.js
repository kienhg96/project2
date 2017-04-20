import { purple500 } from 'material-ui/styles/colors';
export default {
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 15,
		margin: 50
	},
	itemWrapper: {
		flex: 1,
		marginRight: 15
	},
	sellerWrapper: {
		flexBasis: 280,
		flexShrink: 0,
		flexGrow: 0
	},
	title: {
		color: purple500,
		fontSize: 27,
		fontWeight: 500,
		paddingTop: 5,
		marginTop: 10,
		marginBottom: 10,
	},
	price: {
		color: '#e74c3c',
		fontSize: 19,
		fontWeight: 500
	},
	description: {
		textAlign: 'justify'
	},
	reportWrapper: {
		marginTop: 30
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'row',
		height: 80,
		borderBottom: '1px solid #bdc3c7'
	},
	avatarWrapper: {
		marginRight: 10,
		flexBasis: 80,
		flexGrow: 0,
		flexShrink: 0
	},
	avatar: {
		maxWidth: '100%',
		maxHeight: '100%'
	},
	name: {
		fontWeight: 500
	},
	address: {
		color: '#bdc3c7'
	},
	phoneWrapper: {
		textAlign: 'center',
		fontWeight: 500,
		fontSize: 30,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottom: '1px solid #bdc3c7',
		marginBottom: 10
	},
	date: {
		color: '#7f8c8d',
		marginBottom: 5
	},
	commentWrapper: {

	},
	cmtDate: {
		color: '#7f8c8d',
		fontSize: 14
	},
	cmtUser: {
		marginLeft: 10,
		color: 'rgb(156, 39, 176)'
	},
	cmtContent: {

	},
	txtCmtWrapper: {
		marginTop: 5,
		marginBottom: 5
	}
}