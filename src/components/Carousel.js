import React, {useState, useEffect} from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import LoadingOverlay from 'react-loading-overlay-ts';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

function Carousel({ images, links, started }) {

    const [currentIndex, setCurrentIndex] = useState(0);

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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#222831'
            },
            secondary: {
                main: '#00ADB5'
            },
        }
      });

    const cookieName = 'redirectConfirmationEnabled';

    const [open, setOpen] = useState(false);
      
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleContinue = () => {
        setOpen(false);
        window.open(links[currentIndex], '_blank', 'noopener,noreferrer')
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className='w-full max-h-80 md:max-h-56 select-none my-2'>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{accentColor: '#222831'}}
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Redirect to Amazon.com?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to be redirected to Amazon.com 
                        for the clothing item's listing.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleContinue} autoFocus sx={{backgroundColor: '#00ADB5', width: '125px'}}>
                        Continue
                    </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider> 
            <div className='w-full flex flex-row items-center justify-center overflow-x-auto'>
                {/* Left arrow */}
                <div className='group-hover:block relative text-2xl rounded-full mr-5 p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                    <MdChevronLeft onClick={prevSlide} size={35} />
                </div>
                {/* Previous image */}
                <div className='w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center'>
                    <img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} className='max-w-auto max-h-28 md:max-h-32 lg:max-h-44 xl:max-h-52 mx-1 animate-fade-left cursor-pointer' alt={`Image ${currentIndex - 1}`} onClick={handleClickOpen}/>
                </div>
                {/* Current image */}
                <div className='w-1/3 md:w-1/2 lg:w-1/3 flex items-center justify-center'>
                    <img src={images[currentIndex]} className='w-auto max-h-36 md:max-h-48 lg:max-h-52 xl:max-h-60 mx-1 animate-fade cursor-pointer' alt={`Image ${currentIndex}`} onClick={handleClickOpen}/>
                </div>
                {/* Next image */}
                <div className='w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center'>
                    <img src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} className='w-auto max-h-28 md:max-h-32 lg:max-h-44 xl:max-h-52 mx-1 animate-fade-right cursor-pointer' alt={`Image ${currentIndex + 1}`} onClick={handleClickOpen}/>
                </div>
                {/* Right arrow */}
                <div className='group-hover:block relative text-2xl rounded-full ml-5 p-1 h-11 bg-black/20 hover:bg-primary text-tertiary cursor-pointer'>
                    <MdChevronRight onClick={nextSlide} size={35} />
                </div>
            </div>
        </div>
    );
}

export default Carousel;

/*

<div className='w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center'>
<a href={links[currentIndex === 0 ? links.length - 1 : currentIndex - 1]} target="_blank" rel="noopener noreferrer">
    <img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} className='max-w-auto max-h-28 md:max-h-32 lg:max-h-44 xl:max-h-52 mx-1 animate-fade-left' alt={`Image ${currentIndex - 1}`} />
</a>
</div>
<div className='w-1/3 md:w-1/2 lg:w-1/3 flex items-center justify-center'>
<a href={links[currentIndex]} target="_blank" rel="noopener noreferrer">
    <img src={images[currentIndex]} className='w-auto max-h-36 md:max-h-48 lg:max-h-52 xl:max-h-60 mx-1 animate-fade' alt={`Image ${currentIndex}`} />
</a>
</div>
<div className='w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center'>
<a href={links[currentIndex === links.length - 1 ? 0 : currentIndex + 1]} target="_blank" rel="noopener noreferrer">
    <img src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} className='w-auto max-h-28 md:max-h-32 lg:max-h-44 xl:max-h-52 mx-1 animate-fade-right' alt={`Image ${currentIndex + 1}`} />
</a>
</div>

*/