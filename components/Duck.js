'use client';
import styles from './Duck.module.scss';
import { useState, useEffect } from 'react';
import {gsap} from 'gsap';
import { Draggable } from 'gsap/dist/all';
gsap.registerPlugin(Draggable) 


export default function Duck(){
    useEffect(() => {

    },[])



    return(
        <div id="duck" className={styles.duck}>
        
        </div>
    )
}