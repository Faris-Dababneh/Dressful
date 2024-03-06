/*Need to make a function in this component that calls OutfitReader, gets its return value of clothing, and passes this to the Preview component as a state which then updates the items in Preview */
import React, { useState, useEffect } from 'react';

import '../App.css';

import Gender from '../components/inputs/Gender';
import Physical from '../components/inputs/Physical';
import SelectionMode from '../components/inputs/SelectionMode';
import CustomMode from '../components/inputs/CustomMode';

import logo from '../assets/Dressful-logos/dressful-high-resolution-logo-transparent.png'
import {Link} from 'react-router-dom';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

import Preview from './Preview';
import OutfitReader from '../clothing/api/AI';
import LoadingOverlay from 'react-loading-overlay-ts';

import Cookies from 'js-cookie';
import { GrPowerReset } from "react-icons/gr";


function Dresser()
{
    useEffect(() => {
        document.title = 'Dressful - Dress';
    })

    const defaultValues = ['male', [26, 180, 68], 'selection', ['occasion', 'style', 70], '']

    const [genderValue, setGenderValue] = useState(defaultValues[0]);
    const handleGenderChange = (value) => {
        setGenderValue(value);
    }

    const [physicalValue, setPhysicalValue] = useState(defaultValues[1]);
    const handlePhysicalChange = (value) => {
        setPhysicalValue(value); // In array form
    }

    const [mode, setMode] = useState(defaultValues[2]);
    const handleModeChange = (event, newMode) => {
        setMode(newMode);
    };

    const [situationValue, setSituationValue] = useState(defaultValues[3]);
    const handleSituationalChange = (value) => {
        setSituationValue(value); // In array form
    }
    
    const [customValue, setCustomValue] = useState(defaultValues[4]);
    const handleCustomChange = (value) => {
        setCustomValue(value);
    }

    // Set a default outfit for male
    // Go to Preview Component for next step
    const [categorizedItems, setCategorizedItems] = useState({
        headWear: [[[''],['']]],
        upperWear: [[[''],['']]],
        lowerWear: [[[''],['']]],
        footWear: [[[''],['']]],
      });

    const cookieName = 'buttonPressCount'; // If needed for testing, 'Cookies.remove(cookieName)'

    const initialCount = 0;
    const guestOutfitLimit = 6;
    
    const [isDisabled, setIsDisabled] = useState(Cookies.get(cookieName) ? Cookies.get(cookieName) < guestOutfitLimit ? false : true: false); // If the user has previously exceeded the limit, the submit button will be disabled
    const [submitButtonText, setSubmitButtonText] = useState('SUBMIT');
    const [isLoading, setIsLoading] = useState(false);

    const getAndIncrementCount = () => {
        const currentCount = Cookies.get(cookieName) || initialCount;
        const newCount = parseInt(currentCount, 10) + 1;
        Cookies.set(cookieName, newCount, { expires: 7 }); // Store for 7 days
        return newCount;
    };


    const updateClothing = async () => {
        if (Cookies.get(cookieName) >= guestOutfitLimit) {
            setIsDisabled(true);
            setSubmitButtonText('OUTFIT REQUESTS EXCEEDED')
            setIsLoading(true);
            return;
        } else {
            // OutfitReader(gender, age, weight, height, occasion, style, isCustom)
            console.log(`${genderValue}, ${physicalValue[0]}, ${physicalValue[1]}, ${physicalValue[2]}, ${customValue}, true`);
            setIsLoading(true);
            getAndIncrementCount(); // Increments outfit requests by 1
            let items;
            if (mode === 'custom') {
                items = await OutfitReader(genderValue, physicalValue[0], physicalValue[1], physicalValue[2], customValue, null, true);
                setCategorizedItems(items);
                setIsLoading(false);
            } else {
                items = await OutfitReader(genderValue, physicalValue[0], physicalValue[1], physicalValue[2], situationValue[0], situationValue[1], situationValue[2], false);
                setCategorizedItems(items);
                setIsLoading(false);
            }
        }
    }

    const theme = createTheme({
        palette: {
          secondary: {
            main: '#00ADB5'
          }
        }
      });

      return (
        <div className='flex flex-col md:flex-row w-full h-full bg-primary min-h-screen'>
            <div className='md:w-1/3 lg:w-1/4 bg-primary h-full overflow-y-auto'>
                <div className='w-full p-3'>
                    <Link to='/'><button><img src={logo} className='w-[12rem] '/></button></Link>
                </div>
                
                <h2 className='text-2xl font-bold text-tertiary mx-auto mt-2 mb-4'>PHYSICAL DESCRIPTION</h2>
                <Gender onInputChange={handleGenderChange} />
                <Physical onInputChange={handlePhysicalChange}/>
                <h2 className='text-2xl font-bold text-tertiary mx-auto mt-2 mb-4'>SITUATIONAL DESCRIPTION</h2>
                <ThemeProvider theme={theme}>
                    <ToggleButtonGroup
                        color='secondary'
                        value={mode}
                        exclusive
                        onChange={handleModeChange}
                        aria-label="Platform"
                        className='mx-auto mb-6'
                        >
                        <ToggleButton value="selection" className='text-secondary border border-secondary'>Selection</ToggleButton>
                        <ToggleButton value="custom" className='text-secondary border border-secondary'>Custom</ToggleButton>
                    </ToggleButtonGroup>
                </ThemeProvider>
                {mode === 'selection' ? (
                    <SelectionMode onInputChange={handleSituationalChange}/>
                ) : (
                    <CustomMode onInputChange={handleCustomChange}/>
                )}
                <ThemeProvider theme={theme}>
                    <div className='flex flex-row justify-center items-center'>
                        <Fab variant="extended" className='mt-2' sx={{width: '50%'}} color='secondary' onClick={updateClothing} disabled={isDisabled} active={isLoading}>
                            <h1 className='text-xl text-primary'>{submitButtonText}</h1>
                        </Fab>
                        {/*<div className='group-hover:block relative text-2xl rounded-full ml-3 mt-2 p-2 bg-black/20 hover:bg-darkened text-tertiary cursor-pointer'>
                            <GrPowerReset size={35} onClick={}/>
                        </div>*/}
                    </div>
                </ThemeProvider>
            </div>
            <div className='md:w-3/4 h-full bg-accent overflow-y-auto'>
                <LoadingOverlay active={isLoading} spinner className='h-full' text='Processing your outfit...'>
                    <Preview outfit={categorizedItems}/>
                </LoadingOverlay>
            </div>
        </div>
    );
}

export default Dresser;
