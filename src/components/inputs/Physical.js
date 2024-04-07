// INPUTS FOR AGE, WEIGHT, AND HEIGHT
import React, { useState, useEffect } from 'react';

import '../../App.css';

import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Physical({ onInputChange, isMetric })
{
    
    const [age, setAge] = useState(26);
    const [weight, setWeight] = useState(isMetric ? 80 : 180);
    const [height, setHeight] = useState(isMetric ? 170 : 68)

    useEffect(() => {
    }, [isMetric]);

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
                step: 1,
                min: 13,
                max: 80,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
                className='text-tertiary w-12 border-b border-secondary'
                />
            </div>
            <h2 className='text-xl text-tertiary mx-auto mt-2 flex flex-row'>WEIGHT ({isMetric ? (<p>kg</p>) : <p>lbs</p>})</h2>
            <div className='flex w-full items-center align-center content-center justify-center mb-2'>
                <Slider aria-label="Volume" value={weight} name='weight' onChange={handleWeight} valueLabelDisplay="auto" min={isMetric ? 30 : 80} max={isMetric ? 150 : 300} className='w-1/2 mr-4 text-secondary'/>
                <Input
                value={weight}
                name='weight'
                size="small"
                onChange={handleWeight}
                inputProps={{
                step: 1,
                min: isMetric ? 30 : 80,
                max: isMetric ? 150 : 300,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
                className='text-tertiary w-12 border-b border-secondary'
                />
            </div>
            <h2 className='text-xl text-tertiary mx-auto mt-2 flex flex-row'>HEIGHT ({isMetric ? (<p>cm</p>) : <p>in</p>})</h2>
            <div className='flex w-full items-center align-center content-center justify-center mb-2'>
                <Slider aria-label="Custom marks" value={height} name='height' onChange={handleHeight} valueLabelDisplay="auto" min={isMetric ? 100 : 48} max={isMetric ? 220 : 84} className='w-1/2 mr-4 text-secondary' />
                <Input
                value={height}
                name='height'
                size="small"
                onChange={handleHeight}
                inputProps={{
                step: 1,
                min: isMetric ? 100 : 48,
                max: isMetric ? 220 : 84,
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