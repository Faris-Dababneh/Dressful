import React, { useContext, useEffect } from 'react';
import { ReactTyped } from "react-typed";

import '../App.css';
import Navbar from '../components/Navbar';

import {Link} from 'react-router-dom';
import demo from '../assets/DressfulDemo1.gif'

import { RiTShirt2Line } from "react-icons/ri";

function Home()
{
    useEffect(() => {
        document.title = 'Dressful - Home';
    })

    return (
        <div className='flex flex-col items-center justify-center text-center bg-primary min-h-screen' style={{ overscrollBehaviorY: 'none' }}>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-10'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-tertiary mb-2'>
                    Dress <span className='text-secondary'><ReactTyped strings={['Fast.', 'Easy.', 'Well.']} typeSpeed={60} backSpeed={50} /></span>
                </h1>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-tertiary mb-8'>
                    Be <span className='text-secondary'>Prepared.</span>
                </h1>
                <p className='text-lg sm:text-xl lg:text-2xl text-tertiary mb-8 max-w-md'>
                    Determine what <span className='text-secondary'>YOU</span> need to wear for any occasion, event, or situation.
                </p>
                <Link to='/dress'>
                    <button className='flex items-center justify-center text-tertiary text-lg bg-gradient-to-r from-secondary to-darkened mx-10 w-44 h-12 border px-4 transition ease-in-out hover:border-secondary hover:bg-gradient-to-l hover:transform hover:scale-105'>
                        <RiTShirt2Line className='mr-2' size={25}/>
                        START NOW
                    </button>
                </Link>
            </div>
            <div className='mt-10'>
                <img src={demo} className='border-2 border-darkened' alt='Demo'/>
            </div>
        </div>
    );
}

export default Home;
