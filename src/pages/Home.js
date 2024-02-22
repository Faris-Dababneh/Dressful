import React, { useContext } from 'react';
import { ReactTyped } from "react-typed";

import '../App.css';
import Navbar from '../components/Navbar';

import {Link} from 'react-router-dom';
import demo from '../assets/DressfulDemo1.gif'

import { RiTShirt2Line } from "react-icons/ri";

function Home()
{
    return (
        <div className='flex flex-col items-center text-center bg-primary h-screen'>
            <Navbar />
            <div className='flex flex-row items-center justify-center text-center h-screen'>
                <div className='flex flex-col justify-center items-center my-[5%] mr-[5%]'>
                    <h1 className='text-7xl font-bold text-tertiary mb-2'>Dress <b className='text-secondary'><ReactTyped strings={['Fast.', 'Easy.', 'Well.']} typeSpeed={60} backSpeed={50} /></b></h1>
                    <h1 className='text-7xl font-bold text-tertiary mb-8'>Be <b className='text-secondary'>Prepared.</b></h1>
                    <p className='text-2xl text-tertiary mb-8 w-[32rem]'>Determine what <b className='text-secondary'>YOU</b> need to wear for any occasion, event, or situation.</p>
                    <Link to='/dress'><button to='/dress' className='flex items-center justify-center text-tertiary text-lg bg-gradient-to-r from-secondary to-darkened mx-10 w-44 h-12 border px-4 transition ease-in-out hover:border-secondary hover:bg-gradient-to-l hover:transform hover:scale-105'><RiTShirt2Line className='mr-2' size={25}/>START NOW</button></Link>
                </div>
                <div><img src={demo} className='border-2 border-darkened'/></div>
            </div>
            
            
        </div>
    );
}

export default Home;

// Determine what you need to wear for any occasion, day, or time.