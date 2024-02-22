import React, {useState} from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

function Carousel({ images, links }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState();
    const [nextIndex, setNextIndex] = useState();
    
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setPrevIndex(newIndex);
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1; 
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <div className='w-full max-h-56 select-none my-2'>
            <div className='w-full h-1/2 flex flex-row items-center justify-center'>
                <div className='group-hover:block relative text-2xl rounded-full p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                    <MdChevronLeft onClick={prevSlide} size={35} />
                </div>
                <div className='w-52 h-52 flex items-center justify-center'><a href={links[currentIndex === 0 ? links.length - 1 : currentIndex - 1]} target="_blank" rel="noopener noreferrer"><img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} className='max-w-32 max-h-32 mx-10'/></a></div>
                <div className='w-52 h-52 flex items-center justify-center'><a href={links[currentIndex]} target="_blank" rel="noopener noreferrer"><img src={images[currentIndex]} className='max-w-48 max-h-48 mx-10'/></a></div>
                <div className='w-52 h-52 flex items-center justify-center'><a href={links[currentIndex === links.length - 1 ? 0 : currentIndex + 1]} target="_blank" rel="noopener noreferrer"><img src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} className='max-w-32 max-h-32 mx-10'/></a></div>
                <div className='group-hover:block relative text-2xl rounded-full p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                    <MdChevronRight onClick={nextSlide} size={35} />
                </div> 
            </div>
        </div>
    )
}

export default Carousel;