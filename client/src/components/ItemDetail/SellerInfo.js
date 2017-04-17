import React from 'react';
import style from './style';

export default ({avatar, name, address, phone}) => (
	<div style={style.sellerWrapper}>
		<div style={style.infoWrapper}>
			<div style={style.avatarWrapper}>
				<img style={style.avatar} src={avatar} alt="Seller Avatar"/>
			</div>
			<div>
				<div style={style.name}>
					{name}
				</div>
				<div style={style.address}>
					{address}
				</div>
			</div>
		</div>
		<div style={style.phoneWrapper}>
			{phone}
		</div>
		<div>
			Lưu ý khi mua hàng
		</div>
	</div>
)