import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import { RiTShirt2Line } from "react-icons/ri";

import Navbar from '../components/Navbar';
import demo from '../assets/DressfulDemo1.gif';

import Card from '../components/Card';

function Home() {
    useEffect(() => {
        document.title = 'Home | Dressful';
    }, []);

    return (
        <div className='flex flex-col items-center justify-center text-center bg-primary min-h-screen' style={{ overscrollBehaviorY: 'none' }}>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-10 mb-12 animate-fade-right z-10'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-tertiary mb-2'>
                    Dress <span className='text-secondary'><ReactTyped strings={['Fast.', 'Easy.', 'Well.']} typeSpeed={60} backSpeed={50} /></span>
                </h1>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-tertiary mb-8'>
                    Be <span className='text-secondary'>Prepared.</span>
                </h1>
                <p className='text-lg sm:text-xl lg:text-2xl text-tertiary mb-8 max-w-lg'>
                    Determine what <span className='text-secondary'>YOU</span> need to wear for any occasion and style, powered by <span className='text-secondary'>AI</span>.
                </p>
                <Link to='/dress'>
                    <button className='flex items-center justify-center text-tertiary text-xl bg-gradient-to-r from-secondary to-darkened mx-10 sm:w-40 md:w-48 h-16 rounded-2xl border px-4 transition ease-in-out hover:border-secondary hover:bg-gradient-to-l hover:transform hover:scale-105'>
                        <RiTShirt2Line className='mr-2' size={25}/>
                        START NOW
                    </button>
                </Link>
            </div>
            {/* How It Works Section */}
            <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row justify-center items-center mt-12 px-4 animate-fade-down'>
                <div className='flex flex-col'>
                <h2 className='text-5xl text-tertiary font-bold mb-8'>How It <span className='text-secondary'>Works</span></h2>
                    <div className='flex flex-wrap justify-center gap-4 mb-8 max-w-xl'>
                        <Card title="Input Attributes" description="Select your gender, age, weight, and height." />
                        <Card title="Select Occasion" description="Choose the occasion for your outfit." />
                        <Card title="Choose Style" description="Tell us your style preferences." />
                        <Card title="Get Your Outfit" description="AI generates the perfect outfit." />
                    </div>
                </div>
                <div className='flex justify-center items-center mb-8'>
                    <img src={demo} alt='Demo' className='border-2 border-darkened' />
                </div>
            </div>
        </div>
    );
}

export default Home;
