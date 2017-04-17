import React from 'react';
import style from './style';
// Image
export default ({src}) => (
	<div style={style.imageWrapper}>
		<img alt="250x200" src={src} style={style.image}/>
	</div>
);