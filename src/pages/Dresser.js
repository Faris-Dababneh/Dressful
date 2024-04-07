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
import Switch from '@mui/material/Switch';
import Cookies from 'js-cookie';

function Dresser()
{
    useEffect(() => {
        document.title = 'Dress | Dressful';
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

    const [metricToggle, setMetricToggle] = useState(false);
    const [setting, setSetting] = useState('Imperial');

    const handleToggle = (event) => {
        setMetricToggle(event.target.checked);
        if (setting === 'Imperial') {
            setSetting('Metric');
        } else {
            setSetting('Imperial');
        }
    }

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
            setIsLoading(true);
            getAndIncrementCount(); // Increments outfit requests by 1
            let items;
            if (mode === 'custom') {
                items = await OutfitReader(genderValue, physicalValue[0], physicalValue[1], physicalValue[2], customValue, null, true, metricToggle);
                setCategorizedItems(items);
                setIsLoading(false);
            } else {
                items = await OutfitReader(genderValue, physicalValue[0], physicalValue[1], physicalValue[2], situationValue[0], situationValue[1], situationValue[2], false, metricToggle);
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

      const switchLabel = { inputProps: { 'aria-label': 'Metric Toggle' } };

      return (
        <div className='flex flex-col md:flex-row w-full h-full bg-primary min-h-screen animate-fade-down'>
            <ThemeProvider theme={theme}>
            <div className='md:w-2/5 lg:w-1/3 bg-primary sm:h-auto md:h-full sm:overflow-y-scroll md:overflow-y-auto border-r border-darkened border-2'>
                <div className='w-full p-3'>
                    <Link to='/'><button><img src={logo} className='w-[12rem] '/></button></Link>
                </div>
                
                
                <div className='flex flex-col content-center align-center justify-center w-full mb-4'>
                    <h2 className='text-2xl font-bold text-tertiary mt-2'>PHYSICAL DESCRIPTION</h2>
                    <div className='flex flex-row justify-center w-full'>
                        <h2 className='text-xl text-secondary font-bold mt-2 mr-2'>{setting}</h2>
                        <Switch {...switchLabel} checked={metricToggle} onChange={handleToggle}
                                name='metricToggle' color='secondary' className='mt-1'/>
                    </div>
                    
                </div>                
                <Gender onInputChange={handleGenderChange} />
                <Physical onInputChange={handlePhysicalChange} isMetric={metricToggle}/>
                <h2 className='text-2xl font-bold text-tertiary mx-auto mt-2 mb-4'>SITUATIONAL DESCRIPTION</h2>
                
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
                
                {mode === 'selection' ? (
                    <SelectionMode onInputChange={handleSituationalChange} isMetric={metricToggle}/>
                ) : (
                    <CustomMode onInputChange={handleCustomChange}/>
                )}
                    <div className='flex flex-row justify-center items-center'>
                        <Fab variant="extended" className='mt-2 mb-4' sx={{width: '50%'}} color='secondary' onClick={updateClothing} disabled={isDisabled} active={isLoading}>
                            <h1 className='text-xl text-primary'>{submitButtonText}</h1>
                        </Fab>
                    </div>
                
            </div>
            <div className='md:w-3/5 lg:w-2/3 bg-accent sm:h-auto md:h-full sm:overflow-y-scroll md:overflow-y-auto'>
                <LoadingOverlay active={isLoading} spinner className='h-full' text='Processing your outfit...'>
                    <Preview outfit={categorizedItems}/>
                </LoadingOverlay>
            </div>
            </ThemeProvider>
        </div>
    );
}

export default Dresser;
