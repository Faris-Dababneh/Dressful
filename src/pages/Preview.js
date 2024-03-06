import React, { useEffect, useState } from 'react';
import '../App.css';
import 'react-image-crop/dist/ReactCrop.css';

import Carousel from '../components/Carousel';
import LoadingOverlay from 'react-loading-overlay-ts';
function Preview({ outfit })
{
    const [outfitImages, setOutfitImages] = useState({
        headWear: [[['https://cdn-icons-png.flaticon.com/512/864/864744.png']]], // https://cdn-icons-png.flaticon.com/512/864/864744.png
        upperWear: [[['https://cdn-icons-png.flaticon.com/512/3210/3210104.png']]], // https://cdn-icons-png.flaticon.com/512/3210/3210104.png 
        lowerWear: [[['https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png']]], // https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png
        footWear: [[['https://cdn-icons-png.flaticon.com/512/6000/6000380.png']]], // https://cdn-icons-png.flaticon.com/512/6000/6000380.png
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
                } catch (error) {}
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
                } catch (error) {}
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
                setIsWaiting(true);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    });

    return (
        <LoadingOverlay active={isWaiting} spinner className='h-full w-full' text='Assembling your outfit. This will take a few seconds.'>
            <div className='min-h-screen flex flex-col justify-center'>
                <div className='flex flex-col md:flex-row w-full h-full justify-center items-center overflow-auto'>
                    <div className='md:flex md:flex-col overflow-y-auto'>
                        <Carousel images={outfitImages.headWear} links={outfitLinks.headWear} started={isWaiting} />
                        <Carousel images={outfitImages.upperWear} links={outfitLinks.upperWear} started={isWaiting} />
                        <Carousel images={outfitImages.lowerWear} links={outfitLinks.lowerWear} started={isWaiting} />
                        <Carousel images={outfitImages.footWear} links={outfitLinks.footWear} started={isWaiting} />
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
}

export default Preview;

