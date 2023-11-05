'use client'
import {createContext, useContext, useState} from 'react'
import GameContainer from '../components/GameContainer'
import UserInterface from '../components/UserInterface'
import styles from '../styles/Home.module.css';


export const GameContext = createContext();

export default function Home() {
	const [misses, setMisses] = useState(0);

    function missedShot(event) {
		if (!event.target.classList.contains('duck')) {
			// Do something when clicking on the parent, not on the specific child element
			setMisses((prevState) => prevState + 1);
		  }
        
    }
	
	return (
		<GameContext.Provider value={{misses}}>
			<div className={styles.container}>
				<div className={styles.game_and_ui_container}>
					<div onClick={missedShot}>
						<GameContainer/>
					</div>
					<UserInterface />
				</div>
			</div>
		</GameContext.Provider>
	);
}
