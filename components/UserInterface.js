'use client'
import styles from './UserInterface.module.scss';
import { useState, useEffect, useRef, useContext } from 'react';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/all';
import { GameContext } from '../pages/index';
gsap.registerPlugin(Draggable);

export default function UserInterface() {
    const {misses, hits} = useContext(GameContext);

    return (
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
    );
}
