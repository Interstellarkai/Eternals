import React from 'react';
import { SiNetflix } from 'react-icons/si';
const AssetCard = ({ item }) => {
	return (
		<>
			<div className='max-grid-content'>
				<div className='asset-container'>
					<div>
						<h2>{item.name} </h2>
						<p>{item.ticker}</p>
					</div>
				</div>
				<div className='asset-text'>{item.debt_to_equity}</div>
				<div className='asset-text'>{item.interest_coverage}x</div>
				<div className='asset-text'>{item.return_on_equity}%</div>
				<div className='asset-text'>{item.PE_ratio}</div>
			</div>
		</>
	);
};

export default AssetCard;
