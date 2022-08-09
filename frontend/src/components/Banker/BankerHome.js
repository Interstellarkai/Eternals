import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar';
import Menu from "./Menu"

const BankerHome = () => {
	const [pageName, setPageName] = useState("Citibank");

	useEffect(() => {
		const container = document.getElementById("content-container")

		window.microstrategy.dossier.create({
			url:"https://env-262122.customer.cloud.microstrategy.com/MicroStrategyLibrary/app/B7CA92F04B9FAE8D941C3E9B7E0CD754/D7C6D3AA0249540097D5A4AC2F7B49D2/K53--K46",
			enableResponsive: true,
			containerHeight: '1000px',
			placeholder: container
		}).then((dossier) => {
			dossier.registerEventHandler(window.microstrategy.dossier.EventType.ON_PAGE_SWITCHED, updateTitle);
			window.dossier = dossier
			window.menu.updateDossier()
			updateTitle()
		}); 
	});

	const updateTitle = (data) => {
		const currCh = window.dossier.children[window.dossier.currentChapterIndex]
		const currPage = currCh.children[currCh.currentPageIndex]
		
		console.log("In update title, currPage: ", currPage.name);
		// setPageName(currPage.name)
	}

	return (
		<>
			<Navbar />

			<div className="grid-container" id="grid-container">
				<div className="header-container">
					<h2>{"MicroStrategy Embedding SDK Example - "}{pageName}</h2>
				</div>
				<Menu></Menu>
				<div className="content-container" id="content-container">
					
				</div>

			</div>
		</>
	);
};

export default BankerHome;

// Test 