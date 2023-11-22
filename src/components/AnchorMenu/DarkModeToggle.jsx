import React from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DarkModeToggle = ({mode, toggleMode}) => {
    
    document.body.style = mode === 'dark' ? 'background: #121212' : 'background: #ffffff';

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
            }}
        >
            <IconButton onClick={toggleMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

export default DarkModeToggle;
