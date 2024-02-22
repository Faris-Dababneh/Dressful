import React from "react";

import '../App.css';
import App from "../App";
import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import {Link} from 'react-router-dom';

function Navbar()
{
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
}

export default Navbar;