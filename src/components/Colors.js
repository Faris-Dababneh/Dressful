import React from "react";

function Colors({ head, upper, lower, feet})
{
    return (
        <div className='w-full max-h-56 select-none my-2'>
            
            <div className='w-full h-1/2 flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex items-center justify-center border-2'></div>
                <div className='w-28 h-28 flex items-center justify-center border-2'></div>
                <div className='w-28 h-28 flex items-center justify-center border-2'></div>
                <div className='w-28 h-28 flex items-center justify-center border-2'></div>
            </div>
        </div>
    );
}

export default Colors;