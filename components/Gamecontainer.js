import styles from './Gamecontainer.module.scss';
import Duck from './Duck';
import {gsap} from 'gsap';

export default function Gamecontainer(){
  return(
    <div className={styles.gamecontainer}>
      <Duck />
    </div>
  )
}