'use client';
import styles from './Duck.module.scss';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {gsap} from 'gsap';



export default function Duck(){
    
    const duckRef = useRef();
    const [duckPosition, setDuckPosition] = useState('')
    const [flightPosition, setFlightPosition] = useState({ x: 0, y: 0 });

    function getRandomCoordinate(){
        const parentDiv = document.querySelector('.gamecontainer');
        const childDiv = duckRef.current;
        const parentWidth = parentDiv.clientWidth;
        const parentHeight = parentDiv.clientHeight;
        const childWidth = childDiv.clientWidth;
        const childHeight = childDiv.clientHeight;

        // Calculate random positions inside the parent div
        const maxX = parentWidth - childWidth;
        const maxY = parentHeight - childHeight;

        const randomX = Math.max(0, Math.min(maxX, Math.floor(Math.random() * maxX)));
        const randomY = Math.max(0, Math.min(maxY, Math.floor(Math.random() * maxY)));
        // Set the child div's position
        setFlightPosition({ x: randomX, y: randomY });
        console.log(flightPosition)
    }

    function flightTime(){
        //Get random number between 2 and 5
        const timeOfFlight = Math.floor(Math.random() * 4) + 2;
        return timeOfFlight
    }

    function positionDuck() {
        const gameContainerDiv = document.querySelector('.gamecontainer');
        const Duck = duckRef.current;
        const gameContainerWidth = gameContainerDiv.clientWidth;
        const gameContainerHeight = gameContainerDiv.clientHeight;
        const duckWidth = Duck.clientWidth;
        const duckHeight = Duck.clientHeight;
        let randomXPos, randomYPos;
        
        // Determine random position and side
        const sides = ['above', 'below', 'left', 'right'];
        let randomSide = sides[Math.floor(Math.random() * sides.length)];
        setDuckPosition(randomSide)
        
        // Set random positions based on the selected side
        if (randomSide === 'above') {
          randomXPos = Math.floor(Math.random() * (gameContainerWidth - duckWidth));
          randomYPos = -duckHeight;
        } else if (randomSide === 'below') {
          randomXPos = Math.floor(Math.random() * (gameContainerWidth - duckWidth));
          randomYPos = gameContainerHeight;
        } else if (randomSide === 'left') {
          randomXPos = -duckWidth;
          randomYPos = Math.floor(Math.random() * (gameContainerHeight - duckHeight));
        } else if (randomSide === 'right') {
          randomXPos = gameContainerWidth;
          randomYPos = Math.floor(Math.random() * (gameContainerHeight - duckHeight));
        }
        // Set the duck's position
        Duck.style.left = randomXPos + 'px';
        Duck.style.top = randomYPos + 'px';

        console.log(duckPosition)
      }

    useEffect(() => {
        let duck = duckRef.current;
        let ctx = gsap.context((context) => {
            
            context.add("duckSpawn", () => {
                getRandomCoordinate()
                positionDuck()
                if(duckPosition === 'left'){
                    gsap.to(duck, {duration:flightTime(), x: flightPosition.x, y: flightPosition.y})
                }else if(duckPosition === 'right'){
                    gsap.to(duck, {duration:flightTime(), x: -flightPosition.x, y: flightPosition.y})
                }else if(duckPosition === 'above'){
                    gsap.to(duck, {duration:flightTime(), x: flightPosition.x, y: flightPosition.y})
                }else{
                    gsap.to(duck, {duration:flightTime(), x: flightPosition.x, y: -flightPosition.y})
                }
            })
            
            context.add("duckShot",() => {
                ctx.kill()
                gsap.to(duck, {duration:1, y: 500})
            })
        }); // <-- scope (for selector text - only find descendants of this)
        
        ctx.duckSpawn()// This starts the animation
        
        duck.addEventListener("click", (e) => {
            ctx.duckShot()
            gsap.delayedCall(1, ctx.duckSpawn)
        })

        return () => ctx.revert(); // <-- CLEANUP!
    },[duckPosition])
 

    return(
        <div ref={duckRef} className={`${styles.duck} duck`}>
        
        </div>
    )
}