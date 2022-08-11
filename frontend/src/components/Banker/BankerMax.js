import React, { useEffect, useState } from 'react';
import './BankerMax.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

import AssetCard from './AssetCard';
const BankerMax = () => {
	const { state } = useLocation();
	console.log(state);
	const [data, setData] = useState([])
	useEffect(() => { 
		fetch(`http://127.0.0.1:5000/moderaterisk`).then(
			res => res.json()
			
		).then(
			data=> {
				setData(data)
				console.log(data);
			}
		).catch((error)=>{
			console.log(error);
		})
	},[])
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
				{data.map((item,index)=>(
					<AssetCard item = {item} key={index}/>
				))}
				{/* <AssetCard />
				<AssetCard />
				<AssetCard />
				<AssetCard /> */}
			</div>
		</>
	);
};

export default BankerMax;
