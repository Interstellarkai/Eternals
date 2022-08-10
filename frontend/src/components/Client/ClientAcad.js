import React from 'react';
import './ClientAcad.css';
import { Link } from 'react-router-dom';
import AcadCard from './AcadCard';
import Navbar from '../Navbar';
const ClientAcad = () => {
	return (
		<>
			<Navbar view='client' />
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
