import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import { RiTShirt2Line } from "react-icons/ri";

import Navbar from '../components/Navbar';
import demo from '../assets/DressfulDemo1.gif';
import {Helmet} from "react-helmet";
import Card from '../components/Card';
import Fab from '@mui/material/Fab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';

function Home() {
    useEffect(() => {
        document.title = 'Home | Dressful';
    }, []);

    const theme = createTheme({
        palette: {
          secondary: {
            main: '#00ADB5'
          },
        }
      });

    return (
        <div className='flex flex-col items-center justify-center text-center bg-primary min-h-screen' style={{ overscrollBehaviorY: 'none' }}>
            <Helmet>
                <meta name="description" content="The home page of Dressful. Start free now and create your outfit for any occasion and style with artificial intelligence." />
                <link rel="canonical" href="https://dressful.me" />
            </Helmet>
            <Navbar />
            <section className='flex md:flex-row flex-col items-center justify-center py-20 w-full'>
                <div className='flex flex-col items-center justify-center mb-12 animate-fade-right z-10'>
                    <h1 className='text-6xl lg:text-7xl font-bold text-tertiary mb-2'>
                        Dress <span className='text-secondary'><ReactTyped strings={['Fast.', 'Easy.', 'Well.']} typeSpeed={60} backSpeed={50} /></span>
                    </h1>
                    <h1 className='text-6xl lg:text-7xl font-bold text-tertiary mb-8'>
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
                <div className='flex flex-col justify-center md:w-1/5 md:ml-20 text-left text-xl animate-fade-left'>
                    <div className="chat chat-start mb-2">
                        <div className="chat-bubble text-tertiary">Bro, I need your help.</div>
                    </div>
                    <div className="chat chat-end mb-2">
                        <div className="chat-bubble bg-secondary text-tertiary">Speak.</div>
                    </div>
                    <div className="chat chat-start mb-2">
                        <div className="chat-bubble text-tertiary max-w-md">I don't know what to wear tonight.</div>
                    </div>
                    <div className="chat chat-end mb-2">
                        <div className="chat-bubble bg-secondary text-tertiary"><p>Dude, just use <br/><span className='text-primary font-bold text-2xl underline decoration-solid'>Dressful.</span></p></div>
                    </div>
                </div>
            </section>
            {/* How It Works Section */}
            <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row justify-center items-center py-10 px-4 animate-fade-down bg-darkened w-full border-t border-accent'>
                <div className='flex flex-col items-center mt-8'>
                    <h2 className='text-5xl text-tertiary font-bold mb-8'>How It <span className='text-secondary'>Works</span></h2>
                        <div className='flex flex-wrap justify-center gap-4 mb-8 max-w-xl'>
                            <Card title="Input Attributes" description="Select your gender, age, weight, and height." />
                            <Card title="Select Occasion" description="Choose the occasion for your outfit." />
                            <Card title="Choose Style" description="Tell us your style preferences." />
                            <Card title="Get Your Outfit" description="AI generates the perfect outfit." />
                        </div>
                        <Link to='/dress' className='w-full'>
                            <ThemeProvider theme={theme}>
                                <Fab variant="extended" className='mt-2 mb-4' sx={{width: '50%'}} color='secondary'>
                                    <h1 className='text-xl text-darkened'>GET STARTED</h1>
                                </Fab>
                            </ThemeProvider>
                        </Link>
                    </div>
                <div className='flex justify-center items-center mb-8 mt-8'>
                    <img src={demo} alt='Demo' className='border border-accent' />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
