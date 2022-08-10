import './App.css';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import ClientHome from './components/Client/ClientHome';
import BankerHome from './components/Banker/BankerHome';
import ClientAcad from './components/Client/ClientAcad';
import ClientDiscover from './components/Client/Predict/ClientDiscover';
function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/client/home' element={<ClientHome />} />
				<Route path='/client/acad' element={<ClientAcad />} />
				<Route path='/client/discover' element={<ClientDiscover />} />
				<Route path='/banker/home' element={<BankerHome />} />
			</Routes>
		</>
	);
}

export default App;
