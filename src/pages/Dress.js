import React, { useState } from 'react';
import '../App.css';
import Dresser from './Dresser';

function Dress()
{
    return (
        <div className='flex flex-row h-screen items-center text-center bg-primary '>
            <Dresser />
        </div>
    );
}

export default Dress;