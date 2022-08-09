import React from 'react';
import './ClientAcad.css';
import { Link } from 'react-router-dom';
const ClientAcad = () => {
	return (
		<>
			<div className='top-nav'>
				<Link to='/client/home'>
					<div className='logo-left'></div>
				</Link>
				<div className='logo-right'>Citi Acadmeny</div>
			</div>
		</>
	);
};

export default ClientAcad;
