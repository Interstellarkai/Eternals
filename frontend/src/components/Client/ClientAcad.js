import React, { useState } from 'react';
import './ClientAcad.css';
import { Link } from 'react-router-dom';
const ClientAcad = () => {
	const [slide, setSlide] = useState(0);
	return (
		<>
			<div className='top-nav'>
				<Link to='/client/home'>
					<div className='logo-left'></div>
				</Link>
				<div className='logo-right'>Citi Acadmeny</div>
			</div>
			<div className='acad-wrapper'>
				<div className={slide === 0 ? 'acad-slide active' : 'acad-slide'}>
					Slide 1
				</div>
				<div className={slide === 1 ? 'acad-slide active' : 'acad-slide'}>
					Slide 2
				</div>
				<div className={slide === 2 ? 'acad-slide active' : 'acad-slide'}>
					Slide 3
				</div>
				<div className={slide === 3 ? 'acad-slide active' : 'acad-slide'}>
					Slide 4
				</div>
				<button className='next-button' onClick={() => setSlide(slide + 1)}>
					Next
				</button>
				<button className='prev-button' onClick={() => setSlide(slide - 1)}>
					Prev
				</button>
			</div>
		</>
	);
};

export default ClientAcad;
