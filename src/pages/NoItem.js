// Appears when user clicks on empty image icon
import React from "react";
import Navbar from "../components/Navbar";

function NoItem()
{
    return (
        <div className='flex flex-col items-center text-center bg-primary min-h-screen'>
            <Navbar />
            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary mb-2'>No Item</h1>
        </div>
    );
}

export default NoItem;