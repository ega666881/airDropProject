import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress} from '@mui/material';

import { observer } from 'mobx-react';
import RoutesComponent from './routes/routes';
import clientStore from './stores/clientStore';
import './index.css'
import NavBar from './components/nav/navBar';

function App() {
    document.body.style = 'background: black;';
    // useEffect(() => {
    //     if (Telegram.WebApp.initDataUnsafe.user) {
    //         clientStore.getUser(Telegram.WebApp.initDataUnsafe.user.id)
    //     } else {
    //         clientStore.getUser(648698564)
    //     }
        
    // }, [])
    return (
        <>
            <RoutesComponent />
            <Box sx={{display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 0, left: 0, right: 0}}>
                <NavBar activeButton={clientStore.activeButton}/>
            </Box>
        </>
        
    )
}

export default observer(App)
