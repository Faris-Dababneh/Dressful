import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { uploadMessage } from "../clothing/Database";
import Cookies from 'js-cookie';
import { Alert } from "@mui/material";

// ADD A CHECK TO MAKE SURE SOMEONE CANT SPAM THE CONTACT PAGE (USE COOKIES THAT EXPIRE IN 1 DAY)

function Contact()
{
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
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary mb-5'>Contact Us</h1>
                <p className='text-lg sm:text-xl lg:text-2xl text-tertiary mb-8 max-w-md'>Fill out the form for any questions, concerns, suggestions, or business inquiries!</p>
                {didSubmit && (
                    <Alert severity="success" className="mb-4" >
                    Thanks for your feedback! We will get back to you ASAP.
                    </Alert>
                )}
                <div className='bg-darkened w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 h-auto p-10 border-accent border-4 rounded-md'>
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

/*
return (
        <div className='flex flex-col items-center text-center bg-primary h-screen w-screen'>
            <Navbar />
            <div className='flex flex-col items-center text-center align-center justify-center w-screen h-screen'>
                <h1 className='text-7xl font-bold text-secondary mb-8'>Contact Us</h1>
                <p className='text-2xl text-tertiary text-wrap mb-8'>Fill out the form for any questions, concerns, suggestions, or business inquiries!</p>
                <div className='border-accent border-4 bg-darkened w-2/5 h-1/2 p-10'>
                    <input type='text' className='w-1/4 h-[3rem] bg-darkened mb-5 pl-4 rounded-md text-xl text-left border border-tertiary overflow-auto text-tertiary mr-5' placeholder="Name" autofocus onChange={event => setName(event.target.value)}/>
                    <input type='text' className='w-1/4 h-[3rem] bg-darkened mb-5 pl-4 rounded-md text-xl text-left border border-tertiary overflow-auto text-tertiary' placeholder="Email" autofocus onChange={event => setEmail(event.target.value)}/>
                    <textarea type='textarea' className='w-[40rem] h-[10rem] bg-darkened mb-5 rounded-md text-xl text-tertiary border border-tertiary overflow-auto text-left p-4' placeholder="Message" autofocus onChange={event => setInput(event.target.value)}/>
                    <button className='w-[40rem] h-[3rem] border border-tertiary rounded-md text-xl bg-gradient-to-r from-secondary to-darkened text-tertiary transition ease-in-out hover:transform hover:scale-[102%]' onClick={submit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
*/