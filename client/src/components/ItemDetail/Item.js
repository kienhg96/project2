import React from 'react';
// Item of ItemDetail
import ImageGallery from 'react-image-gallery';
import style from './style';

export default ({title, images, price, date, description}) => (
	<div>
		<div>
			<ImageGallery
				items={images}
				slideInterval={2000}
			/>
		</div>
		<div style={style.title}>
			{title}
		</div>
		<div style={style.price}>
			{price}
		</div>
		<div style={style.date}>
			Ngày đăng: {date}
		</div>
		<div style={style.description}>
			{description.split('\n').map((text, i) => (
				<span key={i}>
					{text}
					<br />
				</span>
			))}
		</div>
	</div>
)