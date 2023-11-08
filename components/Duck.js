'use client';
import styles from './Duck.module.scss';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {gsap} from 'gsap';



export default function Duck(){
    const duckRef = useRef();
    const [duckPosition, setDuckPosition] = useState('')
    const [randomX, setRandomX] = useState()
    const [randomY, setRandomY] = useState()
   

    function getRandomCoordinate() {
        // Get random x and y coordinates within the div's width and height
        const x = Math.floor(Math.random() * 800); // Random x coordinate between 0 and 800
        const y = Math.floor(Math.random() * 480); // Random y coordinate between 0 and 480
        
        return setRandomX(x), setRandomY(y) 
    
    }
    function flightTime(){
        //Get random number between 2 and 5
        const timeOfFlight = Math.floor(Math.random() * 4) + 2;
        return timeOfFlight
    }

    function positionDuck() {
        const gameContainerDiv = document.querySelector('.gamecontainer');
        const Duck = document.querySelector('.duck');
        
        // Calculate gameContainer dimensions
        const gameContainerWidth = gameContainerDiv.clientWidth;
        const gameContainerHeight = gameContainerDiv.clientHeight;
      
        // Calculate duck dimensions
        const duckWidth = Duck.clientWidth;
        const duckHeight = Duck.clientHeight;
      
        // Determine random position and side
        const sides = ['above', 'below', 'left', 'right'];
        const randomSide = sides[Math.floor(Math.random() * sides.length)];
        setDuckPosition(randomSide)
        
        let randomXPos, randomYPos;
      
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
      }

    useLayoutEffect(() => {
        // let duck = document.querySelector(".duck")

        // let ctx = gsap.context((context) => {
        //     getRandomCoordinate()
        //     positionDuck()
            
        //     if(duckPosition === 'left'){
        //         gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})
        //     }else if(duckPosition === 'right'){
        //         gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})
        //     }else if(duckPosition === 'above'){
        //         gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})
        //     }else{
        //         gsap.to(".duck", {duration:flightTime(), x: randomX, y: -randomY})
        //     }

            
        //     context.add("duckShot",() => {
        //         ctx.kill()
        //         gsap.to(".duck", {duration:.5, y: 500})
                
        //     })
        // }); // <-- scope (for selector text - only find descendants of this)

        // duck.addEventListener("click", (e) => {
        //     ctx.duckShot()
        // })

        // return () => ctx.revert(); // <-- CLEANUP!
    }, []);

    useEffect(() => {
        let duck = document.querySelector(".duck")

        let ctx = gsap.context((context) => {
            getRandomCoordinate()
            positionDuck()
            
            if(duckPosition === 'left'){
                gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})
            }else if(duckPosition === 'right'){
                gsap.to(".duck", {duration:flightTime(), x: -randomX, y: randomY})
            }else if(duckPosition === 'above'){
                gsap.to(".duck", {duration:flightTime(), x: randomX, y: randomY})
            }else{
                gsap.to(".duck", {duration:flightTime(), x: randomX, y: -randomY})
            }

            
            context.add("duckShot",() => {
                ctx.kill()
                gsap.to(".duck", {duration:.5, y: 500})
                
            })
        }); // <-- scope (for selector text - only find descendants of this)

        duck.addEventListener("click", (e) => {
            ctx.duckShot()
            gsap.delayedCall(2,getRandomCoordinate)
            gsap.delayedCall(2,positionDuck)
        })

        return () => ctx.revert(); // <-- CLEANUP!
    },[duckPosition])

    return(
        <div ref={duckRef} className={`${styles.duck} duck`}>
        
        </div>
    )
}