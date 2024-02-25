import React, { useEffect, useState } from 'react';

import '../App.css';
import 'react-image-crop/dist/ReactCrop.css';

import Carousel from '../components/Carousel';
import LoadingOverlay from 'react-loading-overlay-ts';
import { ReactTyped } from "react-typed";

function Preview({ outfit })
{
    const [outfitImages, setOutfitImages] = useState({
        headWear: [[[''],['']]],
        upperWear: [[[''],['']]],
        lowerWear: [[[''],['']]],
        footWear: [[[''],['']]],
      });
    
    const [outfitLinks, setOutfitLinks] = useState({
        headWear: [[[''],['']]],
        upperWear: [[[''],['']]],
        lowerWear: [[[''],['']]],
        footWear: [[[''],['']]],
      });
    
    const [isWaiting, setIsWaiting] = useState(false);

    // Updates the outfitImages and outfitLinks states with the data from the raw outfit object containing the Amazon API call results
    const updateClothing = async () => {
        const updatedOutfitImages = {...outfitImages};
        const updatedOutfitLinks = {...outfitLinks};
        console.log(updatedOutfitImages)

        Object.keys(outfitImages).forEach((key, index) => {
            console.log(key)
            if (outfit[key].length > 0) {
                const data = [];
                outfit[key].forEach((item) => {
                    data.push(item[1]);
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
                    data.push(item[0]);
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
        console.log(updatedOutfitImages)
        console.log(updatedOutfitLinks)
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
            <div className='flex flex-col md:flex-row w-full h-full justify-center items-center'>
                <div className='md:flex md:flex-col'>
                    <Carousel images={outfitImages.headWear} links={outfitLinks.headWear}/>
                    <Carousel images={outfitImages.upperWear} links={outfitLinks.upperWear}/>
                    <Carousel images={outfitImages.lowerWear} links={outfitLinks.lowerWear}/>
                    <Carousel images={outfitImages.footWear} links={outfitLinks.footWear}/>
                </div>
            </div>
        </LoadingOverlay>
    );
}

export default Preview;

/*
return (
        <LoadingOverlay active={isWaiting} spinner className='h-full w-full' text='Assembling your outfit. This will take a few seconds.'>
            <div className='flex flex-row w-full h-full content-center items-center justify-center'>
                    <div className=''>
                        <Carousel images={outfitImages.headWear} links={outfitLinks.headWear}/>
                        <Carousel images={outfitImages.upperWear} links={outfitLinks.upperWear}/>
                        <Carousel images={outfitImages.lowerWear} links={outfitLinks.lowerWear}/>
                        <Carousel images={outfitImages.footWear} links={outfitLinks.footWear}/>
                    </div>
            </div>
        </LoadingOverlay>
    );

*/
