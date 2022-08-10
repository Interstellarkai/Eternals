import React from 'react';
import image1 from '../../assets/1.jpg';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsFiles, BsLightbulb } from 'react-icons/bs';
const AcadCard = () => {
	return (
		<div className='card'>
			<div className='card-image-wrapper'>
				<img src={image1} alt='image' className='card-image' />
			</div>
			<div className='card-title'>
				<h4>Time Value Of Money</h4>
				<button className='card-rating'>
					<AiFillStar color='yellow' />
					<p>5.0</p>
				</button>
			</div>
			<div className='card-subtitle'>
				<p>Time value of money teaches you ...</p>
			</div>
			<div className='card-info'>
				<div className='card-info-time'>
					<BiTimeFive color='blue' />
					24 hrs
				</div>
				<div className='card-info-lesson'>
					<BsFiles />
					64 lessons
				</div>
				<div className='card-info-level'>
					<BsLightbulb color='orange' />
					Easy
				</div>
			</div>
			<div className='card-button-wrapper'>
				<button className='card-button'>Learn More</button>
			</div>
		</div>
	);
};

export default AcadCard;
