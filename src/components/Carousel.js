import React, {useState, useEffect} from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import LoadingOverlay from 'react-loading-overlay-ts';

function Carousel({ images, links, started }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [array, setArray] = useState(images);
    const [isWaiting, setIsWaiting] = useState(false);

    let executed = 0;

    useEffect(() => {
        // Check if the arrays are different
        if (!arraysAreEqual(images, array)) {
          setIsWaiting(false);
        } else {
            if (executed >= 1 && started === true) {
                setIsWaiting(false);
            } else if (executed >= 1) {
                setIsWaiting(true);
            }
        }
        executed = executed + 1;
      }, [started, images]);

    const arraysAreEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1; 
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <LoadingOverlay active={isWaiting} spinner text='Retrieving your item(s).'>
            <div className='w-full max-h-56 select-none my-2'>
                <div className='w-full h-1/2 flex flex-row items-center justify-center'>
                    <div className='group-hover:block relative text-2xl rounded-full mr-5 p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                        <MdChevronLeft onClick={prevSlide} size={35} />
                    </div>
                    <div className='w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 flex items-center justify-center'>
                        <a href={links[currentIndex === 0 ? links.length - 1 : currentIndex - 1]} target="_blank" rel="noopener noreferrer">
                            <img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} className='w-auto max-h-32 sm:max-h-32 lg:max-h-48 mx-1'/>
                        </a>
                    </div>
                    <div className='w-2/5 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 flex items-center justify-center'>
                        <a href={links[currentIndex]} target="_blank" rel="noopener noreferrer">
                            <img src={images[currentIndex]} className='w-auto max-h-48 sm:max-h-52 mx-1'/>
                        </a>
                    </div>
                    <div className='w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 flex items-center justify-center'>
                        <a href={links[currentIndex === links.length - 1 ? 0 : currentIndex + 1]} target="_blank" rel="noopener noreferrer">
                            <img src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} className='w-auto max-h-32 sm:max-h-32 lg:max-h-48 mx-1'/>
                        </a>
                    </div>
                    <div className='group-hover:block relative text-2xl rounded-full ml-5 p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                        <MdChevronRight onClick={nextSlide} size={35} />
                    </div> 
                </div>
            </div>
        </LoadingOverlay>
    );
}

export default Carousel;
