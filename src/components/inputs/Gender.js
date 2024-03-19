import React, { useState } from 'react';

import '../../App.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Gender({ onInputChange })
{
    const [value, setValue] = useState('male');

    const handleChange = (event) => {
        setValue(event.target.value);
        onInputChange(event.target.value);
    };


    return (
        <FormControl className='mb-2'>
            <FormLabel id="demo-row-radio-buttons-group-label" className='text-xl text-tertiary mx-auto mt-2'>GENDER</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
                className='text-tertiary flex items-center justify-center'
            >
                <FormControlLabel value="male" control={<Radio className='text-secondary'/>} label="Male"/>
                <FormControlLabel value="female" control={<Radio className='text-secondary'/>} label="Female" />
                <FormControlLabel value="neutral" control={<Radio className='text-secondary'/>} label="Neutral" />
            </RadioGroup>
        </FormControl>
    );
}

export default Gender;