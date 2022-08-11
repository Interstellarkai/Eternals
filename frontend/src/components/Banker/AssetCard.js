import React from 'react';
import { SiNetflix } from 'react-icons/si';
const AssetCard = () => {
	return (
		<>
			<div className='max-grid-content'>
				<div className='asset-container'>
					<div>
						<h2>Netflix</h2>
					</div>
				</div>
				<div className='asset-text'>1.33</div>
				<div className='asset-text'>5.4x</div>
				<div className='asset-text'>34%</div>
				<div className='asset-text'>3.4</div>
			</div>
		</>
	);
};

export default AssetCard;
