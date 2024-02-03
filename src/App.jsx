import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome)

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
      </Provider>
    </div>
  );
}

export default App;
