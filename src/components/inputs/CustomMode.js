import React, { useState } from 'react';

import '../../App.css';

import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

import OutfitReader from '../../clothing/api/AI';
import { ConvertImagePNG } from '../../clothing/Database';

function CustomMode({ onInputChange })
{
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
        onInputChange(event.target.value);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00ADB5'
            },
            secondary: {
                main: '#EEEEEE'
            },
        }
      });
    
    return (
        <div className='flex flex-col items-center'>
            <ThemeProvider theme={theme}>
                <TextField
                    id="filled-multiline-static"
                    label="Describe the situation and/or the style"
                    multiline
                    rows={5}
                    onChange={handleChange}
                    variant="filled"
                    sx={{width: '75%', '& .MuiInputBase-input': {color: '#EEEEEE'}}}
                    color='primary'
                    focused
                    className='text-secondary mb-4'
                />
            </ThemeProvider>
            
        </div>
    );
}

export default CustomMode;