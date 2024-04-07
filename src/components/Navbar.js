import React, {useState} from "react";

import '../App.css';
import App from "../App";
import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import {Link} from 'react-router-dom';

function Navbar()
{
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-primary flex justify-between items-center py-4 px-6 md:px-10 lg:px-16 h-20 md:h-18 lg:h-20 my-5 rounded-3xl shadow-sm shadow-tertiary transition-shadow duration-300 hover:shadow-secondary z-50'>
            <Link to='/'><img src={logo} className='w-28 md:w-40 lg:w-44 mr-6 h-auto'/></Link>
            <div className='hidden md:flex ml-auto'>
                <Link to='/contact'><button className='text-tertiary mx-6 md:mx-9 lg:mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>CONTACT</button></Link>
                {/*<Link to='/about'><button className='text-tertiary mx-6 md:mx-9 lg:mx-10 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>ABOUT</button></Link>*/}
                <Link to='/dress'><button className='text-tertiary mx-6 md:mx-9 lg:mx-10 h-10 border px-4 transition-transform hover:border-secondary hover:transform hover:scale-105'>START FOR FREE</button></Link>
            </div>
            <div className='md:hidden relative bg-primary ml-[-1rem]'>
                <div className="dropdown max-w-10">
                    <div tabIndex={0} role="button" className="btn m-1 bg-primary border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto justify-center mb-1 mt-1 mr-[-14px]" fill="none" viewBox="0 0 24 24" stroke="#EEEEEE">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-darkened rounded-box w-[8.8rem]">
                        <li><Link to='/'><button className='w-full text-lg py-1 text-tertiary border-b border-secondary'>HOME</button></Link></li>
                        <li><Link to='/contact'><button className='w-full text-lg py-1 text-tertiary border-b border-secondary'>CONTACT</button></Link></li>
                        {/*<li><Link to='/about'><button className='w-full text-lg py-1 text-tertiary border-b border-secondary'>ABOUT</button></Link></li>*/}
                        <li><Link to='/dress'><button className='w-full text-lg py-1 text-tertiary border-b border-secondary'>START FREE</button></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

// <Link to='/'><button className='text-tertiary mx-4 md:mx-9 h-10 border-b transition-transform hover:border-secondary hover:transform hover:scale-105'>HOME</button></Link>