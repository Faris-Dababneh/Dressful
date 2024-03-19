import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { uploadMessage } from "../clothing/Database";
import Cookies from 'js-cookie';
import { Alert } from "@mui/material";

function Contact()
{
    useEffect(() => {
        document.title = 'Contact | Dressful';
    })

    const [name, setName] = useState('name');
    const [email, setEmail] = useState('email');
    const [input, setInput] = useState('');
    const [submitText, setSubmitText] = useState('SUBMIT')
    const [didSubmit, setDidSubmit] = useState(false);

    const cookieName = 'submitCookie';
    const submitLimit = 4;

    // Checks user cookies to see if they have exceeded the limit for submissions
    const [isDisabled, setIsDisabled] = useState(Cookies.get(cookieName) ? Cookies.get(cookieName) < submitLimit ? false : true: false);

    const getAndIncrementCount = () => {
        const currentCount = Cookies.get(cookieName) || 0;
        const newCount = parseInt(currentCount, 10) + 1;
        Cookies.set(cookieName, newCount, { expires: 1 }); // Store for 1 day
        return newCount;
    };

    const submit = () => {
        if (Cookies.get(cookieName) >= submitLimit) {
            setIsDisabled(true);
            setSubmitText('OUTFIT REQUESTS EXCEEDED')
            return;
        } else {
            getAndIncrementCount();
            uploadMessage(name, email, input)
            setDidSubmit(true);
        }
    }

    return (
        <div className='flex flex-col items-center text-center bg-primary min-h-screen w-screen'>
            <Navbar />
            <div className='flex flex-col items-center justify-center w-full h-full animate-fade-down mt-10 z-10'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary mb-5'>Contact Us</h1>
                <p className='text-lg sm:text-xl lg:text-2xl text-tertiary mb-8 max-w-md'>Fill out the form for any questions, concerns, suggestions, or business inquiries!</p>
                {didSubmit && (
                    <Alert severity="success" className="mb-4" >
                    Thanks for your feedback! We will get back to you ASAP.
                    </Alert>
                )}
                <div className='bg-darkened w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 h-auto p-10 border-accent border-4 rounded-md animate-fade-right'>
                    <input type='text' className='w-full h-12 bg-darkened mb-5 pl-4 rounded-md text-xl text-left border border-tertiary text-tertiary' placeholder="Name" autoFocus onChange={event => setName(event.target.value)}/>
                    <input type='text' className='w-full h-12 bg-darkened mb-5 pl-4 rounded-md text-xl text-left border border-tertiary text-tertiary' placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                    <textarea type='textarea' className='w-full h-40 bg-darkened mb-5 rounded-md text-xl text-tertiary border border-tertiary overflow-auto text-left p-4' placeholder="Message" onChange={event => setInput(event.target.value)}/>
                    <button className='w-full h-12 border border-tertiary rounded-md text-xl bg-gradient-to-r from-secondary to-darkened text-tertiary transition ease-in-out hover:transform hover:scale-105' onClick={submit} disabled={isDisabled}>{submitText}</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
