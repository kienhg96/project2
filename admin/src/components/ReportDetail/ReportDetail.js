import React from 'react';
import { Paper, Divider } from 'material-ui';
import { RaisedButton } from 'material-ui';

const style = {
	contentWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		flex: '0 0 180px',
		fontWeight: 600,
		textAlign: 'center'
	},
	content: {
		borderLeft: '1px solid #bdc3c7',
		paddingLeft: 10,
		flex: 1,
		paddingBottom: 20,
		paddingTop: 20
	},
	action: {
		margin: 20
	}
}

export default (props) => {
	const { report } = props;
	return (
		<div>
			<Paper zDepth={2}>
				<div style={style.contentWrapper}>
					<div style={style.label}>
						ID
					</div>
					<div style={style.content}>
						{report.reportId}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Ngày
					</div>
					<div style={style.content}>
						{report.date}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Nội dung báo cáo
					</div>
					<div style={style.content}>
						{report.content}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						ID tin đăng
					</div>
					<div style={style.content}>
						{report.product.productId}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Tiêu đề
					</div>
					<div style={style.content}>
						{report.product.name}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Giá
					</div>
					<div style={style.content}>
						{report.product.price}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Mô tả
					</div>
					<div style={style.content}>
						{report.product.description}
					</div>
				</div>
				<Divider />
				<div style={style.contentWrapper}>
					<div style={style.label}>
						Ngày đăng
					</div>
					<div style={style.content}>
						{report.product.date}
					</div>
				</div>
				<Divider />
				<div>
					<RaisedButton label="Xóa báo cáo" primary={true}
						onTouchTap={() => props.onDeleteReport(report.reportId)}
						style={style.action}
					/>
					<RaisedButton label="Xóa tin đăng" secondary={true}
						onTouchTap={() => props.onDeletePost(report.product.productId)}
						style={style.action}
					/>
				</div>
			</Paper>
		</div>
	)
}