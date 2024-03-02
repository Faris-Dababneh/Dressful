import React, { useState } from 'react';

import '../../App.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slider, Input } from '@mui/material';
import Switch from '@mui/material/Switch';

function SelectionMode({ onInputChange })
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

    const temperatureMarks = [
    {
        value: 0,
        label: '0°F',
    },
    {
        value: 30,
        label: '30°F',
    },
    {
        value: 60,
        label: '60°F',
    },
    {
        value: 90,
        label: '90°F',
    },
    ];

    const switchLabel = { inputProps: { 'aria-label': 'Temperature Toggle' } };

    return (
        <div className='flex flex-col items-center content-center'>
            <ThemeProvider theme={theme}>
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
                    options={moods}
                    value={styleValue}
                    onChange={(event, newValue) => {
                        // Update the state when a new value is selected
                        handleStyle(newValue);
                      }}
                    sx={{ width: '80%', maxWidth: 300, '& .MuiInputLabel-root': { color: '#00ADB5' }, '& .MuiInputBase-root': { '&.Mui-focused': { color: '#EEEEEE' } }, '& .MuiInputBase-input': {color: '#EEEEEE'}, '& .MuiInput-underline:after': {color: '#00ADB5'} }}
                    renderInput={(params) => <TextField {...params} label="Mood" color='secondary' />}
                    className='mb-4'
                />
                <div className='flex flex-row content-center align-center justify-center w-full'>
                    <h2 className='text-xl text-tertiary mt-2 mr-2'>TEMPERATURE (°F)</h2>
                    <Switch {...switchLabel} checked={temperatureToggle} onChange={handleToggle}
                                name='temperatureToggle' color='secondary' className='mt-1'/>
                </div>
                
                {temperatureToggle && (
                    <div className='flex w-full items-center align-center content-center justify-center mb-4'>
                        <Slider
                            aria-label="Always visible"
                            name='temperature'
                            value={temperatureValue} onChange={handleTemperature}
                            defaultValue={70}
                            step={10}
                            marks={temperatureMarks}
                            valueLabelDisplay='auto'
                            sx={{width: '70%', maxWidth: 300}}
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

const moods = [
  'Casual and Comfortable',
  'Professional and Polished',
  'Chic and Stylish', 
  'Casual Elegance', 
  'Athleisure',
  'Bohemian or Free-spirited',
  'Formal and Classic',
  'Quirky and Unique',
  'Minimalist',
  'Vintage or Retro',
  'Bold and Edgy',
  'Feminine or Romantic',
  'Gothic or Dramatic',
  'Casual and Boho',
  'Youthful and Trendy'
]

const occasions = [
    'Job interview',
    'Business gathering',
    'Wedding ceremony',
    'Beach vacation',
    'Casual Friday at work',
    'Hiking trip',
    'Formal dinner party',
    'Gym workout',
    'Running',
    'Date night',
    'Skiing or snowboarding',
    'Music festival',
    'Picnic in the park',
    'Outdoor wedding',
    'Summer barbecue',
    'Cocktail party',
    'Sailing trip',
    'Job fair',
    'Graduation ceremony',
    'Art gallery opening',
    'Yoga class', 
    'First day of school', 
    'Amusement park visit', 
    'Opera or theater performance', 
    'Family reunion', 
    'Black-tie event', 
    'Cooking class', 
    'Charity gala', 
    'Job promotion celebration', 
    'Fishing trip',
    'Bachelorette party',
    'Camping weekend',
    'Volunteer work',
    'Game night with friends',
    'Art class',
    'Soccer match',
    'Business casual event',
    'Dog walking',
    'Networking event',
    'Book club meeting',
    'Costume party',
    'Wine tasting',
    'Traveling by plane',
    'Cookout in the backyard',
    'Karaoke night',
    'Zumba class',
    'Car show',
    'Podcast recording',
    'Ski lodge après-ski',
    'Tailgating at a sports event',
    'Piano recital',
    'Political rally',
    'Community service day',
    'High school reunion',
    'Paint and sip night',
    'Board game tournament',
    'Dog show',
    'Ice cream social',
    'Tech conference',
    'Farming or agricultural fair',
    'High tea',
    'Political debate',
    'Running errands',
    'Skating at an ice rink',
    'School play',
    'Photography exhibition',
    'Dance class',
    'Historical reenactment',
    'Technology workshop',
    'Star-gazing night',
    'Flea market shopping',
    'Escape room challenge',
    'Bowling night',
    'Community theater performance',
    'Road trip',
    'Science fair',
    'Dog agility competition',
    'Art auction',
    'Culinary tour',
    'Science museum visit',
    'Neighborhood block party',
    'Gardening club meeting',
    'Trivia night at a pub',
    'Beach cleanup',
    'Political campaign event',
    'Craft fair',
    'Indoor climbing',
    'Photowalk',
    'Chess tournament',
    'Comic book convention',
    'Historical walking tour',
    'Job training or workshop',
    'Astronomy club meeting',
    'Circus performance',
    'Fashion show',
    'Family movie night',
    'Farmers market visit',
    'Basketball game',
    'Charity run or walk',
]
export default SelectionMode;