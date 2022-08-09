import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
	return (
		<div className='row'>
			<nav className='nav'>
				<div className='logo'>Logo</div>
				<ul className='navList'>
					<li className='navItem'>
						<Link to='/client/home'>
							<a className='listItem'>Home</a>
						</Link>
					</li>
					<li className='navItem'>
						<Link to='/client/acad'>
							<a className='listItem'>Citi Acad</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
