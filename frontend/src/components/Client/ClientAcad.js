import React from 'react';
import './ClientAcad.css';
import { Link } from 'react-router-dom';
import AcadCard from './AcadCard';
import Navbar from '../Navbar';
const acadVideos = [
	{
		title: 'Time Value of Money',
		desc: 'Time Value of Money teaches you ...',
		url: 'https://www.youtube.com/watch?v=DEE-8NOU3sM&ab_channel=CitiUAE',
		time: '24 hrs',
		lessons: '64 lessons',
		diff: 'Easy',
	},
	{
		title: 'Teaching Kids About Money',
		desc: 'Five tips to help parents educate ...',
		url: 'https://www.youtube.com/watch?v=23zF_mvYRwI&list=PL7807xkyz4XTTv_vk7VqdzE2SZxuA0uBh&index=5&ab_channel=Citi',
		time: '2 mins',
		lessons: '1 lessons',
		diff: 'Easy',
	},
	{
		title: 'Five tips about investment',
		desc: 'Helping investors grow their port ...',
		url: 'https://www.youtube.com/watch?v=DEE-8NOU3sM&ab_channel=CitiUAE',
		time: '2 hrs',
		lessons: '7 lessons',
		diff: 'Medium',
	},
	{
		title: 'Rich Dad Poor Dad',
		desc: 'Investment gurus ...',
		url: 'https://www.youtube.com/watch?v=DEE-8NOU3sM&ab_channel=CitiUAE',
		time: '82 hrs',
		lessons: '7 lessons',
		diff: 'Hard',
	},
];
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
					{acadVideos.map((item, index) => (
						<AcadCard item={item} key={index} />
					))}
				</div>
			</div>
		</>
	);
};

export default ClientAcad;
