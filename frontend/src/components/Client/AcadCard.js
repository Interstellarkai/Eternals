import React from 'react';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsFiles, BsLightbulb } from 'react-icons/bs';
const AcadCard = ({ item }) => {
	return (
		<div className='card'>
			<div className='card-image-wrapper'>
				<img src={item.img} alt='image' className='card-image' />
			</div>
			<div className='card-title'>
				<h4>{item.title}</h4>
				<button className='card-rating'>
					<AiFillStar color='yellow' />
					<p>{item.rating}</p>
				</button>
			</div>
			<div className='card-subtitle'>
				<p>{item.desc}</p>
			</div>
			<div className='card-info'>
				<div className='card-info-time'>
					<BiTimeFive color='blue' />
					{item.time}
				</div>
				<div className='card-info-lesson'>
					<BsFiles />
					{item.lessons}
				</div>
				<div className='card-info-level'>
					<BsLightbulb color='orange' />
					{item.diff}
				</div>
			</div>
			<div className='card-button-wrapper'>
				<a href={item.url} target='_blank'>
					<button className='card-button'>Learn More</button>
				</a>
			</div>
		</div>
	);
};

export default AcadCard;
