'use client'
import {createContext, useContext} from 'react'
import styles from './GameContainer.module.scss'
import Duck from './Duck'
import {gsap} from 'gsap'

export default function GameContainer(){
    
    return(
        <div className={`${styles.gamecontainer} gamecontainer`} >
            <Duck />
        </div>
    
    )
}