import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = ({ view }) => {
	return (
		<div className='row'>
			<div className='top-nav'>
				<Link to='/client/home'>
					<div className='logo-left'></div>
				</Link>
				<div className='logo-right'>Logo Right</div>
			</div>
			{view === 'client' ? (
				<>
					<nav className='nav'>
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
				</>
			) : (
				<>
					<nav className='nav'>
						<ul className='navList'>
							<li className='navItem'>
								<Link to='/banker/home'>
									<a className='listItem'>Home</a>
								</Link>
							</li>
							<li className='navItem'>
								<Link to='/banker/port'>
									<a className='listItem'>Portfolio Optimizer</a>
								</Link>
							</li>
						</ul>
					</nav>
				</>
			)}
		</div>
	);
};

export default Navbar;
