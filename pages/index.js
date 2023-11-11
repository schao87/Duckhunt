'use client';
import {createContext, useContext, useState, useEffect, useRef} from 'react'
// import GameContainer from '../components/GameContainer'
// import UserInterface from '../components/UserInterface'
import styles from '../styles/Home.module.css';
import {gsap} from 'gsap';

// export const GameContext = createContext();

export default function Home() {
	const [ignition, setIgnition] = useState(false)
	const [misses, setMisses] = useState(0);
	const [hits, setHits] = useState(0);
	const gameContainerRef = useRef(null);
	const duckRef = useRef(null);
	

    function shotCounter(event) {
		if (event.target.classList.contains('gamecontainer')) {
			setMisses((prevState) => prevState + 1);
		}else if(event.target.classList.contains('duck')){
			setHits((prevState) => prevState + 1);
		} 
    }
	function flightTime(){
        //Get random number between 1 and 4
        const timeOfFlight = Math.floor(Math.random() * 3) + 1;
        return timeOfFlight
    }

	const getRandomPosition = () => {
		const gamecontainer = gameContainerRef.current;
		const duck = duckRef.current;

		const gamecontainerBounds = gamecontainer.getBoundingClientRect();
		const duckBounds = duck.getBoundingClientRect();

		const maxX = gamecontainerBounds.width - duckBounds.width;
		const maxY = gamecontainerBounds.height - duckBounds.height;

		const randomX = Math.floor(Math.random() * maxX);
		const randomY = Math.floor(Math.random() * maxY);

		return { x: randomX, y: randomY };
	};
	

	useEffect(() => {
		
			const duck = duckRef.current;
			const randomPosition1 = getRandomPosition();
			const randomPosition2 = getRandomPosition();

			let ctx = gsap.context((context) => {
				context.add("duckMove", () => {
					gsap.set(duck, { x: randomPosition1.x, y: randomPosition1.y });
					gsap.to(duck, { x: randomPosition2.x, y: randomPosition2.y, duration: flightTime() });
					console.log("moving duck to random position")
				})
				
				context.add("duckShot",() => {
				    ctx.kill()
				    gsap.to(duck, {duration:1, y: 500})
					console.log("duck dying")
				})
			});// <-- scope (for selector text - only find descendants of this)
			
			
			duck.addEventListener("click", (e) => {
				ctx.duckShot()
				gsap.delayedCall(2, ctx.duckMove)
			})
			
		return () => ctx.revert(); // <-- CLEANUP!
	},[hits])
	
	

	return (
		<div className={styles.container}>
			<div className={styles.game_and_ui_container} onClick={shotCounter}>
				<div ref={gameContainerRef} className={`${styles.gamecontainer} gamecontainer`}>
					<div ref={duckRef} className={`${styles.duck} duck`}></div>
				</div>
				<div id="userinterface" className={styles.userinterface}>
					<div id="misscounter" className={styles.miss_counter}>
						<p>Misses</p>
						<p>{misses}</p>
					</div>
					<div id="hitcounter" className={styles.hit_counter}>
						<p>Hits</p>
						<p>{hits}</p>
					</div>
				</div>
			</div>
		</div>
	);
	
}