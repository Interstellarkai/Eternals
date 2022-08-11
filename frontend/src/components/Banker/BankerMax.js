import React, { useEffect } from 'react';
import './BankerMax.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

import AssetCard from './AssetCard';
const BankerMax = () => {
	const { state } = useLocation();
	console.log(state);
	return (
		<>
			<Navbar view='banker' />
			<div className='max-wrapper'>
				<div className='max-title'>
					<h2>
						Based on the profile of age range <b>{state.age.label}</b> with{' '}
						<b>{state.risk.label}</b> risk appetite ...
					</h2>
				</div>
				<div className='max-grid-title'>
					<div>ASSET NAME</div>
					<div>DEBT/EQUITY</div>
					<div>INTEREST COVERAGE</div>
					<div>ROE</div>
					<div>P/E RATIO</div>
				</div>
				<AssetCard />
				<AssetCard />
				<AssetCard />
				<AssetCard />
			</div>
		</>
	);
};

export default BankerMax;
