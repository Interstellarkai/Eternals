import React, { useState } from 'react';
import './Chat.css';
import { AiOutlineMessage } from 'react-icons/ai';
const Chat = () => {
	const [chatOpen, setChatOpen] = useState(false);
	return (
		<>
			<div className='chat-wrapper'>
				<div
					className={chatOpen ? 'chatbox chatbox-open' : 'chatbox chatbox-close'}
				>
					Chat box
				</div>
				<button className='chat-icon' onClick={() => setChatOpen(!chatOpen)}>
					<AiOutlineMessage size={30} />
				</button>
			</div>
		</>
	);
};

export default Chat;
