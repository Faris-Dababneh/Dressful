import React, { useState } from 'react';
import '../App.css';
import Dresser from './Dresser';
import { Helmet } from 'react-helmet';

function Dress()
{
    return (
        <div className='flex flex-row h-screen items-center text-center bg-primary '>
            <Helmet>
                <meta name="description" content="The outfit creation page of Dressful. Create a free outfit now for your physical, situational, and stylistic needs." />
                <link rel="canonical" href="https://dressful.me/dress" />
            </Helmet>
            <Dresser />
        </div>
    );
}

export default Dress;