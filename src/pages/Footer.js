import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'

import { FaLinkedin } from "react-icons/fa";

function Footer()
{
    return (
        <div className='flex flex-col w-full items-center border-t border-accent py-14 text-tertiary'>
            <footer className="footer p-10 bg-primary text-[#9e9e9e] w-2/3 md:w-1/2">
                <nav>
                    <h6 className="text-tertiary font-bold text-md">MENU</h6> 
                    <Link to='/'><a className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Home</a></Link>
                    <Link to='/contact'><a className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Contact</a></Link>
                    <Link to='/dress'><a className="hover:underline">Start Now</a></Link>
                </nav> 
            </footer> 
            <footer className="footer px-10 py-4 border-t bg-primary text-base-content border-secondary w-2/3 md:w-1/2">
                <aside className="flex flex-col justify-center items-center pt-5">
                    <Link to='/'><img src={logo} className='w-40 lg:w-44 mr-6 h-auto' onClick={() => window.scrollTo(0, 0)}/></Link>
                    <p className='text-tertiary'>Copyright © 2024 - All right reserved</p>
                </aside> 
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://www.linkedin.com/in/faris-dababneh/' target='_blank'><FaLinkedin size={30} className="cursor-pointer text-tertiary"/></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
}

export default Footer;