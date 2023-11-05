'use client'
import {createContext, useContext, useState} from 'react'
import GameContainer from '../components/GameContainer'
import UserInterface from '../components/UserInterface'
import styles from '../styles/Home.module.css';


export const GameContext = createContext();

export default function Home() {
	const [misses, setMisses] = useState(0);
	const [hits, setHits] = useState(0);

    function shotCounter(event) {
		if (!event.target.classList.contains('duck')) {
			setMisses((prevState) => prevState + 1);
		  }else if(event.target.classList.contains('duck')){
			setHits((prevState) => prevState + 1);
		  }
        
    }
	
	return (
		<GameContext.Provider value={{ misses, hits }}>
			<div className={styles.container}>
				<div className={styles.game_and_ui_container}>
					<div onClick={shotCounter}>
						<GameContainer/>
					</div>
					<UserInterface />
				</div>
			</div>
		</GameContext.Provider>
	);
}
