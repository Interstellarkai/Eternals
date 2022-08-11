import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
const Auth = () => {
	return (
		<div className='auth-wrapper'>
			<div className='bg-image'></div>
			<div className='auth-content'>
				<div className='auth-title'>
					<h1>Welcome To Wealth Buddy</h1>
					<p>
						<br />
						Your one stop solution for wealth management!
					</p>
				</div>
				<div className='auth-subtitle'>
					<h2>I am a...</h2>
				</div>
				<div className='content-wrapper'>
					<button className='auth-left'>
						<Link to='/client/home'>
							<p className='auth-text'>Client</p>
						</Link>
					</button>
					<div className='auth-right'>
						<Link to='/banker/home'>
							<p className='auth-text'>Banker</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
