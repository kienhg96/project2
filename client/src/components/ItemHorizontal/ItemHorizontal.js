import React from 'react';
import { Paper } from 'material-ui';
import style from './style';
import Image from './Image';
import Content from './Content';

export default ({title, price, date, address, description, image, url}) => (
	<Paper zDepth={1} style={style.container}>
		<Image src={image} />
		<Content 
			title={title}
			price={price}
			date={date}
			address={address}
			description={description}
			url={url}
		/>
	</Paper>
);
