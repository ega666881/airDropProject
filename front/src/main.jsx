import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Space Grotesk',
    fontWeight: "Bold",
    color: 'white'
  },
  palette: {
    text: {
      primary: '#1976d2',
      secondary: 'white', 
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
