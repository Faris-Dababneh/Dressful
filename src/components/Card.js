import React from 'react';

function Card({ title, description }) {
    return (
        <div className='max-w-56 bg-darkened rounded-lg border border-secondary shadow-md animate-fade-up'>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-tertiary">{title}</h5>
                <p className="mb-3 font-normal text-gray-400">{description}</p>
            </div>
        </div>
    );
}

export default Card;