import React, { useState } from 'react';

import '../App.css';
import Navbar from '../components/Navbar';
import Dresser from './Dresser';
import Sidebar from '../components/Sidebar';

import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import {Link} from 'react-router-dom';

function Dress()
{
    return (
        <div className='flex flex-row h-screen items-center text-center bg-primary '>
            <Dresser />
        </div>
        
    );
}

export default Dress;