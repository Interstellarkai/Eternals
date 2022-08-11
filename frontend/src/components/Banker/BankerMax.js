import React, { useEffect, useState } from 'react';
import './BankerMax.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import AssetCard from './AssetCard';
const BankerMax = () => {
	const { state } = useLocation();
	console.log(state);
	const [data, setData] = useState([])
	useEffect(() => { 
		fetch(`/moderaterisk`).then(
			res => res.json()
			
		).then(
			data=> {
				setData(data)
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
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
				{data.map((item, index) => (
					<AssetCard item={item} key={index} />
				))}

				<div className='definition-wrapper'>
					<div className='definition-title'>
						<h2>
							Definition of <b>{state.risk.label} </b> risk appetite
						</h2>
						<Collapsible trigger='Benjamin Graham and Warren Buffett Model'>
							<p className='collapse-text'>
								<br />
								Step 1: Filtering out all companies with sales less than USD 250
								million. Companies with sales lower than this are very small companies
								and might not have the business stability and access to finance that is
								required for a safe investment. This eliminates the basic business risk.{' '}
								<br />
								<br />
								Step 2: Filtering out all companies with debt to equity greater than
								30%. Companies with low leverage are safer.
								<br />
								<br /> Step 3: Filtering out all companies with interest coverage ratio
								of less than 4. Companies with high interest coverage ratio have a
								highly reduced bankruptcy risk.
								<br />
								<br /> Step 4: Filtering out all companies with ROE less than 15% since
								they are earning less than their cost of capital. High ROE companies
								have a robust business model, which generates increased earnings for the
								company typically.
								<br />
								<br /> Step 5: Filtering out all companies with PE ratio greater than 25
								since they are too expensive even for a high-quality company. This
								enables us to pick companies which are relatively cheaper as against
								their actual value. He points out that applying these filters enables us
								to reduce and even eliminate a lot of fundamental risks while ensuring a
								robust business model, strong earning potential and a good buying price.
							</p>
						</Collapsible>
					</div>
				</div>
			</div>
		</>
	);
};

export default BankerMax;
