import React from 'react';
import Navbar from '../../Navbar';
import './ClientPred.css';
import { useParams } from 'react-router-dom';
const ClientPred = () => {
	const { id } = useParams();
	return (
		<>
			<Navbar view='client' />
			<div className='predict-wrapper'>
				<div className='predict-title'>
					<h1>TELSA</h1>
					<h2>NASDAQ:{id.toUpperCase()}</h2>
				</div>
				<div className='predict-stock-info'>
					<div className='predict-stock-sector'>
						<h2>Consumer Cyclical</h2>
						<h3s>Sector</h3s>
					</div>
					<div className='predict-stock-open'>
						<h2>USD 850.00</h2>
						<h3s>Open</h3s>
						<h2>USD 872.00</h2>
						<h3s>Close</h3s>
					</div>
					<div className='predict-stock-change'>
						<h2>-21.170 (-2.44%)</h2>
						<h3s>Change</h3s>
						<h2>USD 871.270</h2>
						<h3s>Price</h3s>
					</div>
					<div className='predict-stock-range'>
						<h2>USD 870 - USD 850</h2>
						<h3s>Day’s Range</h3s>
						<h2>USD 870 - USD 850</h2>
						<h3s>52 Weeks Range</h3s>
					</div>
				</div>
				<div className='predict-company'>
					<h2>Company Profile</h2>
					<p>
						Founded in 2003 and based in Palo Alto, California, Tesla is a vertically
						integrated sustainable energy company that also aims to transition the
						world to electric mobility by making electric vehicles. The company sells
						solar panels and solar roofs for energy generation plus batteries for
						stationary storage for residential and commercial properties including
						utilities. Tesla has multiple vehicles in its fleet, which include luxury
						and midsize sedans and crossover SUVs. The company also plans to begin
						selling more affordable sedans and small SUVs, a light truck, a semi
						truck, and a sports car. Global deliveries in 2021 were a little over
						936,000 units.
					</p>
				</div>
				<div className='predict-forecast'>
					<h2>Forecast Price</h2>
					<div className='forecast-content-wrapper'>
						<div className='forecast-stock-price'>
							<h2>USD900.00</h2>
							<h3s>(+- 24.56 uncertainty)</h3s>
						</div>
						<div className='forecast-stock-desc'>
							<h3s>
								Based on our algothrim, the price target for TSLA is $876.24 with
								uncertainty of 23.08
							</h3s>
						</div>
						<div className='forecast-stock-date'>
							<h2>2010/06/29 - 2022/08/09</h2>
							<h3s>Train History Date</h3s>
						</div>
						<div className='forecast-stock-rating'>
							<h2>Moderate Buy</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientPred;
