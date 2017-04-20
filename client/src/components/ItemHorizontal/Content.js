import React from 'react';
import { RaisedButton } from 'material-ui';
import style from './style';
import { Link } from 'react-router-dom';

// Content
export default ({title, price, date, description, address, url, action}) => (
	<div style={style.contentWrapper}>
		<div style={style.headWrapper}>
			<div style={style.title}>{title}</div>
			<span style={style.price}>{price}</span>
		</div>
		<div style={style.description}>{description}</div>
		<div style={style.actionWrapper}>
			<div style={style.date}>{date + " | " + address}</div>
			<div>
				{action}
				<Link to={url}>
					<RaisedButton label="Xem thêm" primary={true}/>
				</Link>
			</div>
		</div>
	</div>
)
