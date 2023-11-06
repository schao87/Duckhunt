'use client';
import styles from './Duck.module.scss';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {gsap} from 'gsap';



export default function Duck(){
    const duckRef = useRef();
    
    let randomX = ""
    let randomY = ""
    let randomSpawnPositions = ["x:-50", "x:800", "y:-50", "y:480" ]

    function getRandomCoordinate() {
        // Get random x and y coordinates within the div's width and height
        const x = Math.floor(Math.random() * 800); // Random x coordinate between 0 and 800
        const y = Math.floor(Math.random() * 480); // Random y coordinate between 0 and 480
        
        randomX = x 
        randomY = y
    }
    function flightTime(){
        //Get random number between 2 and 5
        const timeOfFlight = Math.floor(Math.random() * 4) + 2;
        return timeOfFlight
    }


    useLayoutEffect(() => {
        let duck = document.querySelector(".duck")

        let ctx = gsap.context((context) => {
            getRandomCoordinate()

            context.add("duckShot",() => {
                ctx.kill()
                gsap.to(".duck", {duration:.5, y: 500})
                
            })

            gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})

        }); // <-- scope (for selector text - only find descendants of this)

        duck.addEventListener("click", (e) => {
            ctx.duckShot()
        })

        return () => ctx.revert(); // <-- CLEANUP!
    }, []);



    return(
        <div ref={duckRef} className={`${styles.duck} duck`}>
        
        </div>
    )
}