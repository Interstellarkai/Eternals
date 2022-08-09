import React from 'react';
import Navbar from '../Navbar';
import Chat from './Chat/Chat';
const ClientHome = () => {
	return (
		<>
			<Navbar view='client' />
			<Chat />
		</>
	);
};

export default ClientHome;
