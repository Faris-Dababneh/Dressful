// INPUTS FOR AGE, WEIGHT, AND HEIGHT
import React, { useState } from 'react';

import '../../App.css';

import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Physical({ onInputChange })
{
    
    const [age, setAge] = useState(26);
    const [weight, setWeight] = useState(180);
    const [height, setHeight] = useState(68)

    const handleAge = (event) => {
        setAge(event.target.value);
        onInputChange([event.target.value, weight, height]);
    }

    const handleWeight = (event) => {
        setWeight(event.target.value);
        onInputChange([age, event.target.value, height]);
    }

    const handleHeight = (event) => {
        setHeight(event.target.value);
        onInputChange([age, weight, event.target.value]);
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
    
    return (
      <ThemeProvider theme={theme}>
        <div className='flex flex-col items-center content-center align-center mb-2'>
            <h2 className='text-xl text-tertiary mx-auto mt-2'>AGE</h2>
            <div className='flex w-full items-center align-center content-center justify-center mb-2'>
                <Slider aria-label="Volume" name='age' value={age} onChange={handleAge} valueLabelDisplay="auto" min={13} max={80} className='w-1/2 mr-4 text-secondary'/>
                <Input
                value={age}
                size="small"
                name='age'
                onChange={handleAge}
                inputProps={{
                step: 3,
                min: 13,
                max: 80,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
                className='text-tertiary w-12 border-b border-secondary'
                />
            </div>
            <h2 className='text-xl text-tertiary mx-auto mt-2 '>WEIGHT (lbs)</h2>
            <div className='flex w-full items-center align-center content-center justify-center mb-2'>
                <Slider aria-label="Volume" value={weight} name='weight' onChange={handleWeight} valueLabelDisplay="auto" min={80} max={300} className='w-1/2 mr-4 text-secondary'/>
                <Input
                value={weight}
                name='weight'
                size="small"
                onChange={handleWeight}
                inputProps={{
                step: 5,
                min: 80,
                max: 300,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
                className='text-tertiary w-12 border-b border-secondary'
                />
            </div>
            <h2 className='text-xl text-tertiary mx-auto mt-2 '>HEIGHT (in)</h2>
            <div className='flex w-full items-center align-center content-center justify-center mb-2'>
                <Slider aria-label="Custom marks" value={height} name='height' onChange={handleHeight} valueLabelDisplay="auto" min={48} max={84} className='w-1/2 mr-4 text-secondary'/>
                <Input
                value={height}
                name='height'
                size="small"
                onChange={handleHeight}
                inputProps={{
                step: 1,
                min: 48,
                max: 84,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
                className='text-tertiary w-12 border-b border-secondary'
                />
            </div>
                
        </div>
      </ThemeProvider>
    );
}

export default Physical;