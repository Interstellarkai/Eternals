import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar';
import './ClientPred.css';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const ClientPred = () => {
	const { id } = useParams();
	const [data, setData] = useState(null);

	useEffect(() => { 
		
		fetch(`http://127.0.0.1:5000/predict/${id}`).then(
			res => res.json()
			
		).then(
			data=> {
				setData(data)
				console.log(data);
			}
		).catch((error)=>{
			console.log(error);
		})
	},[])
	return (
		<>
			<Navbar view='client' />
			{data === null ? <ClipLoader size={150} className='loading-spinner'/> : <div className='predict-wrapper'>
				<div className='predict-title'>
					<h1>{data.name}</h1>
					<h2>NASDAQ:{id.toUpperCase()}</h2>
				</div>
				<div className='predict-stock-info'>
					<div className='predict-stock-sector'>
						<h2>{data.sector}</h2>
						<h3s>Sector</h3s>
					</div>
					<div className='predict-stock-open'>
						<h2>USD {data.quote_table.Open}</h2>
						<h3s>Open</h3s>
						<h2>USD {data.quote_table.PreviousClose}</h2>
						<h3s>Prev Close</h3s>
					</div>
					<div className='predict-stock-change'>
						<h2>{data.day_change} ({data.day_change_percentage} %)</h2>
						<h3s>Change</h3s>
						<h2>USD {data.quote_table.QuotePrice}</h2>
						<h3s>Price</h3s>
					</div>
					<div className='predict-stock-range'>
						<h2>USD {data.quote_table.DayRange}</h2>
						<h3s>Day’s Range</h3s>
						<h2>USD {data.quote_table.ftWeekRange}</h2>
						<h3s>52 Weeks Range</h3s>
					</div>
				</div>
				<div className='predict-company'>
					<h2>Company Profile</h2>
					<p>
						{data.summary}
					</p>
				</div>
				<div className='predict-forecast'>
					<h2>Forecast Price</h2>
					<div className='forecast-content-wrapper'>
						<div className='forecast-stock-price'>
							<h2>USD {data.forecast}</h2>
							<h3s>(+- {data.bound} uncertainty)</h3s>
						</div>
						<div className='forecast-stock-desc'>
							<h3s>
								Based on our algorithm, the price target for TSLA is USD {data.forecast} with
								uncertainty of USD {data.bound}
							</h3s>
						</div>
						<div className='forecast-date'>
							<h2>{data.forecast_date}</h2>
							<h3s>Forecast Date</h3s>
						</div>
						<div className='forecast-stock-date'>
							<h2>{data.min_date} - {data.max_date}</h2>
							<h3s>Train History Date</h3s>
						</div>
						<div className='forecast-stock-rating'>
							<h2>{data.recommendation}</h2>
						</div>
					</div>
				</div>
			</div>}
		</>
	);
};

export default ClientPred;
