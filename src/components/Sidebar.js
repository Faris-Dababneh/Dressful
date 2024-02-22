import React from "react";

import '../App.css';
import App from "../App";
import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import {Link} from 'react-router-dom';

function Sidebar()
{
    return (
        <div className='bg-primary flex flex-col w-1/4 h-full p-4 shadow-sm shadow-tertiary transition-shadow duration-300 hover:shadow-secondary'>
            <Link to='/'><button><img src={logo} className='w-[12rem] ml-2'/></button></Link>
            <div className='flex flex-col h-full w-full ml-auto content-center align-center text-center'>
                
            </div>
        </div>
    );
}

export default Sidebar;