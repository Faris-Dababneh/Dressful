import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { uploadMessage } from "../clothing/Database";

function Contact()
{

    const [name, setName] = useState('name');
    const [email, setEmail] = useState('email');
    const [input, setInput] = useState('');

    const submit = () => {
        uploadMessage(name, email, input)
    }

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
}

export default Contact;