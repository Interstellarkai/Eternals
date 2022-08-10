import React from 'react';
import Navbar from '../../Navbar';
import {useNavigate } from 'react-router-dom'
import './ClientDiscover.css';
const ClientDiscover = () => {
	let navigate = useNavigate(); 
	const routeChange = ()=>{
		let path = `/predict/tsla`;
		navigate(path);
	}
	return (
		<>
			<Navbar view='client' />
			<div className='discover-wrapper'>
				<div className='discover-search-container'>
					<div className='search-title'>
						<h1>Discover your next favourite asset!</h1>
					</div>
					<div className='search-bar-div'>
						<input
							type='text'
							placeholder='E.g. AAPL, TSLA, MSFT...'
							className='search-bar'
						></input>
					</div>
					<div className='search-button-div'>
						<button className='search-button'>Search</button>
					</div>
				</div>
				<div className='discover-recom-container'>
					<div className='recom-title'>
						<h1>Our Recommendations for you</h1>
					</div>
					<div className='recom-content'>
					
						<button className='recom-card-telsa' onClick={routeChange}></button>
						<button className='recom-card-apple'></button>
						<button className='recom-card-micro'></button>
						<button className='recom-card-netflix'></button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientDiscover;
