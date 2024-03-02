/*
    LOT OF TROUBLESHOOTING IN ORDER:
    1. FIX SIZING OF CAROUSEL/PREVIEW (IMAGES TOO SMALL SOMETIMES)
    2. FIX THE LOADING MENU OF THE CAROUSEL (HAVE LOADING SCREEN WHEN THE CLOTHING ITEMS AREN'T FULLY READY FOR EACH BODY PART)
    3. TEST OUT THIS INPUT AGAIN "I am hiking across alaska and it is extremely cold. I need enough clothing to keep me from having frostbite" AND MAKE SURE IT WORKS (BEFORE IT WOULD HAVE EMPTY IMAGES WHICH WERE JUST "")
    4. I CHANGED THE API TO A BETTER ONE, TEST THIS OUT ONE TIME BECAUSE YOU DONT HAVE MANY FREE REQUESTS LEFT
*/

import React, { useEffect, useState } from 'react';
import '../App.css';
import 'react-image-crop/dist/ReactCrop.css';

import Carousel from '../components/Carousel';
import LoadingOverlay from 'react-loading-overlay-ts';
import { ReactTyped } from "react-typed";
import { FaHatCowboy } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { PiPantsLight } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";

function Preview({ outfit })
{
    const [outfitImages, setOutfitImages] = useState({
        headWear: [[['https://cdn-icons-png.flaticon.com/512/864/864744.png']]], 
        upperWear: [[['https://cdn-icons-png.flaticon.com/512/3210/3210104.png']]],
        lowerWear: [[['https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png']]],
        footWear: [[['https://cdn-icons-png.flaticon.com/512/6000/6000380.png']]],
      });
    
    const [outfitLinks, setOutfitLinks] = useState({
        headWear: [[['https://cdn-icons-png.flaticon.com/512/864/864744.png']]],
        upperWear: [[['https://cdn-icons-png.flaticon.com/512/3210/3210104.png']]],
        lowerWear: [[['https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png']]],
        footWear: [[['https://cdn-icons-png.flaticon.com/512/6000/6000380.png']]],
      });
    
    const [isWaiting, setIsWaiting] = useState(false);

    // Updates the outfitImages and outfitLinks states with the data from the raw outfit object containing the Amazon API call results
    const updateClothing = async () => {
        const updatedOutfitImages = {...outfitImages};
        const updatedOutfitLinks = {...outfitLinks};
        console.log(updatedOutfitImages)

        Object.keys(outfitImages).forEach((key, index) => {
            if (outfit[key].length > 0) {
                const data = [];
                outfit[key].forEach((item) => {
                    if (item[1] !== '') {
                        data.push(item[1]);
                    }
                })
                updatedOutfitImages[key] = data;
                setIsWaiting(false);
            } else {
                try {
                    updatedOutfitImages[key] = [outfit[key][0][1]];
                    setIsWaiting(false);
                } catch {
                    console.log('Waiting...')
                }
            }
        })
        Object.keys(outfitLinks).forEach((key, index) => {
            if (outfit[key].length > 0) {
                const data = [];
                outfit[key].forEach((item) => {
                    if (item[0] !== '') {
                        data.push(item[0]);
                    }
                })
                updatedOutfitLinks[key] = data;
                setIsWaiting(false);
            } else {
                try {
                    updatedOutfitLinks[key] = [outfit[key][0][0]];
                    setIsWaiting(false);
                } catch {
                    console.log('Waiting...')
                }
            }
        })
        setOutfitImages(updatedOutfitImages);
        setOutfitLinks(updatedOutfitLinks);
    }

    // It will make sure there is an array to operate on so that updateClothing() can be called
    useEffect(() => {
        const intervalId = setInterval(() => {
            try {
                if (outfit.upperWear[0][0].length > 5 || outfit.lowerWear[0][0].length > 5) {
                    updateClothing();
                }
            }
            catch {
                console.log('Waiting for API');
                setIsWaiting(true);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    });

    return (
        <LoadingOverlay active={isWaiting} spinner className='h-full w-full' text='Assembling your outfit. This will take a few seconds.'>
            <div className='flex flex-col md:flex-row w-full h-full justify-center items-center overflow-auto'>
                <div className='md:flex md:flex-col overflow-y-auto'>
                    <Carousel images={outfitImages.headWear} links={outfitLinks.headWear} started={isWaiting}/>
                    <Carousel images={outfitImages.upperWear} links={outfitLinks.upperWear} started={isWaiting}/>
                    <Carousel images={outfitImages.lowerWear} links={outfitLinks.lowerWear} started={isWaiting}/>
                    <Carousel images={outfitImages.footWear} links={outfitLinks.footWear} started={isWaiting}/>
                </div>
            </div>
        </LoadingOverlay>
    );
}

export default Preview;

