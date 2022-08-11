import React, { useState } from 'react';
import Navbar from '../Navbar';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import './BankerPort.css';

const optionsAge = [
	{ value: 'children', label: '<18' },
	{ value: 'youngAdults', label: '18-30' },
	{ value: 'middleAdults', label: '31-65' },
	{ value: 'oldAdults', label: '>65' },
];

const optionsRisk = [
	{ value: 'low', label: 'Low' },
	{ value: 'moderate', label: 'Moderate' },
	{ value: 'high', label: 'High' },
];
const BankerPort = () => {
	const [selectedAgeOption, setSelectedAgeOption] = useState(null);
	const [selectedRiskOption, setSelectedRiskOption] = useState(null);

	return (
		<>
			<Navbar view='banker' />
			<div className='port-wrapper'>
				<div className='port-container'>
					<div className='port-title'>
						<h2>User Profiling</h2>
					</div>
					<div className='port-age'>
						<h3>Age</h3>
						<Select
							defaultValue={selectedAgeOption}
							onChange={setSelectedAgeOption}
							options={optionsAge}
						/>
					</div>
					<div className='port-risk'>
						<h3>Risk Appetite</h3>
						<Select
							defaultValue={selectedRiskOption}
							onChange={setSelectedRiskOption}
							options={optionsRisk}
						/>
					</div>
					<div className='port-btn-container'>
						<Link
							to='/banker/port/max'
							state={{ age: selectedAgeOption, risk: selectedRiskOption }}
						>
							<button className='port-btn'>Submit</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BankerPort;
