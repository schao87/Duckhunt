import GameContainer from '../components/GameContainer'
import UserInterface from '../components/UserInterface'
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.game_and_ui_container}>
				<GameContainer />
				<UserInterface />
			</div>
		</div>
	);
}
