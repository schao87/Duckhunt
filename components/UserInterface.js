'use client';
import styles from './UserInterface.module.scss';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/all';
gsap.registerPlugin(Draggable);

export default function UserInterface() {
  const [misses, setMisses] = useState(0);

  function missedShot(event) {
    console.log('event.target.id');
    setMisses((prevState) => prevState + 1);
  }

  return (
    <div id="userinterface" className={styles.userinterface}>
      <div id="misscounter" onClick={(e) => missedShot(e)} className={styles.miss_counter}>
        {misses}
      </div>
    </div>
  );
}
