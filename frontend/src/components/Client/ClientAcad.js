import React, { useState } from 'react';
import './ClientAcad.css';
import { Link } from 'react-router-dom';
import AcadCard from './AcadCard';
const ClientAcad = () => {
	const [slide, setSlide] = useState(0);
	return (
		<>
			<div className='top-nav'>
				<Link to='/client/home'>
					<div className='logo-left'></div>
				</Link>
				<div className='logo-right'>Citi Academy</div>
			</div>
			<div className='acad-wrapper'>
				<h2>Wealth Management Make Easy</h2>
				<p>
					Learn from our interactive courses to increase your finanical literacy
				</p>
				<div className='acad-content'>
					<AcadCard />
					<AcadCard />
					<AcadCard />
					<AcadCard />
				</div>
			</div>
		</>
	);
};

export default ClientAcad;
