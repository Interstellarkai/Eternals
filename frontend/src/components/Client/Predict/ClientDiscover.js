import React, {useRef} from 'react';
import Navbar from '../../Navbar';
import {useNavigate } from 'react-router-dom'
import './ClientDiscover.css';
const ClientDiscover = () => {
	let navigate = useNavigate(); 
	const textRef = useRef();
	const handleSearch = () =>{
		let path = textRef.current.value;
		navigate(`/client/predict/${path}`)
	}
	const routeChange = (path)=>{
		
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
							ref={textRef}
							
						></input>
					</div>
					<div className='search-button-div'>
						<button className='search-button' onClick={handleSearch}>Search</button>
					</div>
				</div>
				<div className='discover-recom-container'>
					<div className='recom-title'>
						<h1>Our Recommendations for you</h1>
					</div>
					<div className='recom-content'>
					
						<button className='recom-card-telsa' onClick={()=>routeChange(`/client/predict/tsla`)}></button>
						<button className='recom-card-apple' onClick={()=>routeChange(`/client/predict/aapl`)}></button>
						<button className='recom-card-micro' onClick={()=>routeChange(`/client/predict/msft`)}></button>
						<button className='recom-card-netflix' onClick={()=>routeChange(`/client/predict/nflx`)}></button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientDiscover;
