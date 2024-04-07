import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import pic1 from '../assets/farisandcow.jpg';

function About()
{
    useEffect(() => {
        document.title = 'About Me | Dressful';
    })

    return (
        <div className='flex flex-col items-center text-center bg-primary min-h-screen w-screen'>
            <Navbar />
            <div className='flex flex-col items-center justify-center w-full h-full animate-fade-down mt-10 z-10'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary mb-5'>About Me!</h1>
                <div className="flex flex-row w-full justify-center">
                    <p className='text-lg sm:text-xl lg:text-2xl text-tertiary mb-8 max-w-md text-left tracking-wide leading-10'>Hello, I'm Faris! <br/><br/> As you can see by my two unmatched sweatshirts,
                     I don't have the best fashion sense. <br/><br/>It was 30 degrees when I met those cows, and I felt it. I needed something to help me find the right clothes for situations like these... <br/><br/>and boom, Dressful.
                     <br/><br/>The idea appeared</p>
                    <img src={pic1} alt="Faris and Cow" className="w-1/5 h-auto"/>
                </div>
                
            </div>
        </div>
    );
}

export default About;
