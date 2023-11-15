import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3
          }}
        >
        </Box>
      </Provider>
    </div>
  );
}

export default App;
