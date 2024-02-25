import React, {useState} from "react";

import '../App.css';
import App from "../App";
import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import {Link} from 'react-router-dom';

function Navbar()
{
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-primary flex justify-between items-center py-4 px-6 md:px-10 lg:px-16 h-20 md:h-18 lg:h-20 my-5 rounded-3xl shadow-sm shadow-tertiary transition-shadow duration-300 hover:shadow-secondary'>
            <Link to='/'><img src={logo} className='w-24 md:w-32 lg:w-40 h-auto'/></Link>
            <div className='hidden md:flex ml-auto'>
                <Link to='/'><button className='text-tertiary mx-6 md:mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>HOME</button></Link>
                <Link to='/contact'><button className='text-tertiary mx-6 md:mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>CONTACT</button></Link>
                <Link to='/dress'><button className='text-tertiary mx-6 md:mx-10 h-10 border px-4 transition-transform hover:border-secondary hover:transform hover:scale-105'>START FOR FREE</button></Link>
            </div>
            <div className='md:hidden relative'>
                <button className='text-tertiary ease-in-out hover:scale-105' onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className='absolute top-full right-0 mt-2 bg-primary rounded-lg shadow-md'>
                        <div className='flex flex-col'>
                            <Link to='/'><button className='w-full text-left py-2 px-4 text-tertiary border-b border-darkened'>HOME</button></Link>
                            <Link to='/contact'><button className='w-full text-left py-2 px-4 text-tertiary border-b border-darkened'>CONTACT</button></Link>
                            <Link to='/dress'><button className='w-full text-left py-2 px-4 text-tertiary'>START FOR FREE</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;

/*

return (
        <div className='bg-primary flex w-1/2 h-20 p-4 mt-4 rounded-3xl shadow-sm shadow-tertiary transition-shadow duration-300 hover:shadow-secondary'>
            <Link to='/'><button><img src={logo} className='w-[12rem] ml-2'/></button></Link>
            <div className='flex ml-auto'>
                <Link to='/'><button className='text-tertiary mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>HOME</button></Link>
                <Link to='/contact'><button className='text-tertiary mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>CONTACT</button></Link>
                <Link to='/dress'><button className='text-tertiary mx-10 h-10 border px-4 transition-transform hover:border-secondary hover:transform hover:scale-105'>START FOR FREE</button></Link>
            </div>
        </div>
    );

*/