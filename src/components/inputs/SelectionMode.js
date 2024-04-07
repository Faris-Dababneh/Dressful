import React, { useState } from 'react';

import '../../App.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slider, Input, MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

function SelectionMode({ onInputChange, isMetric })
{
    const [occasionValue, setOccasionValue] = useState(null);
    const [styleValue, setStyleValue] = useState(null);
    const [temperatureValue, setTemperatureValue] = useState(70);
    const [temperatureToggle, setTemperatureToggle] = useState(true);

    const handleOccasion = (value) => {
        setOccasionValue(value);
        onInputChange([value, styleValue, temperatureValue]);
    }
    const handleStyle = (value) => {
        setStyleValue(value);
        onInputChange([occasionValue, value, temperatureValue]);
    }
    const handleTemperature = (event) => {
        setTemperatureValue(event.target.value);
        onInputChange([occasionValue, styleValue, event.target.value]);
    }
    const handleToggle = (event) => {
        setTemperatureToggle(event.target.checked);
    }

    

    const theme = createTheme({
        palette: {
            primary: {
                main: '#EEEEEE'
            },
          secondary: {
            main: '#00ADB5'
          },
        }
      });

    const switchLabel = { inputProps: { 'aria-label': 'Temperature Toggle' } };

    return (
        <div className='flex flex-col items-center content-center'>
            <ThemeProvider theme={theme}>
                <Autocomplete
                    freeSolo
                    disablePortal
                    value={occasionValue}
                    id="combo-box-demo"
                    name='occasion'
                    includeInputInList
                    options={occasions}
                    onChange={(event, newValue) => {
                        // Update the state when a new value is selected
                        handleOccasion(newValue);
                      }}
                    focused
                    sx={{ width: '80%', maxWidth: 300, '& .MuiInputLabel-root': { color: '#00ADB5' }, '& .MuiInputBase-root': { '&.Mui-focused': { color: '#EEEEEE' } }, '& .MuiInputBase-input': {color: '#EEEEEE'} }}
                    renderInput={(params) => <TextField {...params} label="Occasion" color='secondary' />}
                    className='mb-4'
                />
                <Autocomplete
                    freeSolo
                    disablePortal
                    id="combo-box-demo"
                    name='style'
                    includeInputInList
                    options={styles}
                    color='primary'
                    onChange={(event, newValue) => {
                        // Update the state when a new value is selected
                        handleStyle(newValue);
                        }}
                    sx={{ width: '80%', maxWidth: 300, '& .MuiInputLabel-root': { color: '#00ADB5' }, '& .MuiInputBase-root': { '&.Mui-focused': { color: '#EEEEEE' } }, '& .MuiInputBase-input': {color: '#EEEEEE'}, '& .MuiInput-underline:after': {color: '#00ADB5'} }}
                    renderInput={(params) => <TextField {...params} label="Style" color='secondary' />}
                    className='mb-4'
                />           
                
                <div className='flex flex-row content-center align-center justify-center w-full'>
                    <h2 className='text-xl text-tertiary mt-2 mr-2 flex flex-row'>TEMPERATURE ({isMetric ? <p>°C</p> : <p>°F</p>})</h2>
                    <Switch {...switchLabel} checked={temperatureToggle} onChange={handleToggle}
                                name='temperatureToggle' color='secondary' className='mt-1'/>
                </div>
                
                {temperatureToggle && (
                    <div className='flex w-full items-center align-center content-center justify-center mb-4'>
                        <Slider
                            aria-label="Always visible"
                            name='temperature'
                            value={temperatureValue} onChange={handleTemperature}
                            //defaultValue={isMetric ? 20 : 70}
                            step={5}
                            min={isMetric ? -20 : 0}
                            max={isMetric ? 40 : 100}
                            valueLabelDisplay='auto'
                            sx={{width: '60%', maxWidth: 300}}
                            className='mr-4 text-secondary'
                        />
                        <Input
                            value={temperatureValue}
                            size="small"
                            name='temperature'
                            onChange={handleTemperature}
                            inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                            }}
                            className='text-tertiary w-12 border-b border-secondary'
                        />
                    </div>
                )}
                
                
            </ThemeProvider>
        </div>
    );
}

const styles = ['Casual', 'Professional', 'Business Casual', 'Streetwear', 'Vintage', 'Bohemian', 'Preppy', 'Sporty/athleisure', 'Goth', 'Minimalist', 'Romantic', 'Punk', 'Glamorous', 'Hipster', 'Ethical/Sustainable', 'Androgynous', 'High Fashion', 'Country/Western', 'Nautical', 'Cosplay'];

/*
{Old select components}
<Autocomplete
                    disablePortal
                    value={occasionValue}
                    id="combo-box-demo"
                    name='occasion'
                    includeInputInList
                    options={occasions}
                    onChange={(event, newValue) => {
                        // Update the state when a new value is selected
                        handleOccasion(newValue);
                      }}
                    focused
                    sx={{ width: '80%', maxWidth: 300, '& .MuiInputLabel-root': { color: '#00ADB5' }, '& .MuiInputBase-root': { '&.Mui-focused': { color: '#EEEEEE' } }, '& .MuiInputBase-input': {color: '#EEEEEE'} }}
                    renderInput={(params) => <TextField {...params} label="Occasion" color='secondary' />}
                    className='mb-4'
                />

     <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name='style'
                    includeInputInList
                    options={styles}
                    color='primary'
                    onChange={(event, newValue) => {
                        // Update the state when a new value is selected
                        handleStyle(newValue);
                      }}
                    sx={{ width: '80%', maxWidth: 300, '& .MuiInputLabel-root': { color: '#00ADB5' }, '& .MuiInputBase-root': { '&.Mui-focused': { color: '#EEEEEE' } }, '& .MuiInputBase-input': {color: '#EEEEEE'}, '& .MuiInput-underline:after': {color: '#00ADB5'} }}
                    renderInput={(params) => <TextField {...params} label="Style" color='secondary' />}
                    className='mb-4'
                />           
*/

const occasions = [
    'Wedding',
    'Cocktail party',
    'Job interview',
    'Date night',
    'Beach vacation',
    'Formal gala',
    'Business conference',
    'Music festival',
    'Sports game',
    'Picnic',
    'Barbecue',
    'Nightclub',
    'Theater performance',
    'Art gallery opening',
    'Hiking trip',
    'Camping',
    'Yoga class',
    'Skiing or snowboarding',
    'Graduation ceremony',
    'Baby shower',
    'Bridal shower',
    'Engagement party',
    'Birthday party',
    'Costume party',
    'Corporate event',
    'Charity fundraiser',
    'Black-tie event',
    'White-tie event',
    'Awards ceremony',
    'Dinner party',
    'Brunch',
    'First day of school',
    'Last day of school',
    'Prom',
    'Homecoming',
    'Family reunion',
    'High tea',
    'Wine tasting',
    'Tailgate party',
    'Boat cruise',
    'Road trip',
    'Job fair',
    'Art class',
    'Cooking class',
    'Dance class',
    'Volunteer work',
    'Sightseeing tour',
    'Museum visit',
    'Movie premiere',
    'Book launch',
    'Fashion show',
    'Farmers market',
    'Spa day',
    'Golf outing',
    'Tennis match',
    'Polo match',
    'Horse racing',
    'Dog show',
    'Music concert',
    'Stand-up comedy show',
    'Poetry reading',
    'Networking event',
    'Product launch',
    'Trade show',
    'Political rally',
    'Protest march',
    'Stargazing',
    'Hot air balloon ride',
    'Skydiving',
    'Bungee jumping',
    'Paintballing',
    'Laser tag',
    'Escape room',
    'Karaoke night',
    'Game night',
    'Board game tournament',
    'Pub crawl',
    'Wine and paint night',
    'Salsa dancing',
    'Jazz club',
    'Spoken word event',
    'Ice skating',
    'Rollerblading',
    'Bowling',
    'Rock climbing',
    'Trampoline park',
    'Amusement park',
    'Water park',
    'Carnival',
    'Street fair',
    'Food truck festival',
    'Beer festival',
    'Wine festival',
    'Oktoberfest',
    'Halloween party',
    'Thanksgiving dinner',
    'Christmas party',
    'New Year\'s Eve celebration',
    'Hanukkah gathering',
    'Eid al-Fitr celebration',
    'Cricket match',
    'Rugby game',
    'Baseball game',
    'American football game',
    'Soccer match',
    'Basketball game',
    'Tennis tournament',
    'Golf tournament',
    'Swimming competition',
    'Surfing competition',
    'Triathlon',
    'Marathon',
    'Cycling race',
    'Boxing match',
    'Wrestling match',
    'MMA fight',
    'Horseback riding comp.',
    'Gymnastics competition',
    'Figure skating competition',
    'Ski race'
];

export default SelectionMode;