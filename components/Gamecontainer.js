import styles from './GameContainer.module.scss';
import Duck from './Duck';
import {gsap} from 'gsap';

export default function GameContainer(){
    return(
        <div id="gamecontainer" className={styles.gamecontainer}>
            <Duck />
        </div>
    )
}