'use client'
import {createContext, useContext, useState} from 'react'
import GameContainer from '../components/GameContainer'
import UserInterface from '../components/UserInterface'
import styles from '../styles/Home.module.css';


const GameContext = createContext();

export default function Home() {
	const [misses, setMisses] = useState(0);

    function missedShot(event) {
        console.log(event.target.id);
        setMisses((prevState) => prevState + 1);
    }
	
	return (
		<div className={styles.container}>
			<div className={styles.game_and_ui_container}>
				<GameContext.Provider value={{ misses }}>
					<GameContainer onClick={(e) => missedShot(e)}/>
				</GameContext.Provider>
				<UserInterface />
			</div>
		</div>
	);
}
