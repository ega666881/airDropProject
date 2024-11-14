import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import clientStore from '../../stores/clientStore';

function NavBar({activeButton}) {
    const navigate = useNavigate()

    const changeActiveButton = (newActiveButton) => {
        clientStore.setActiveButton(newActiveButton)
        navigate(newActiveButton)
    }

    return  <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 5, backgroundColor: 'black', width: '100%', justifyContent: 'center'}}>
        <Button onClick={() => changeActiveButton('')}><img src={activeButton === '' ? (mediaManager('homeIconActive')):(mediaManager('homeIcon'))}/></Button>
        <Button onClick={() => changeActiveButton('airdrop')}><img src={activeButton === 'airdrop' ? (mediaManager('airdropIconActive')):(mediaManager('airdropIcon'))}/></Button>
        <Button onClick={() => changeActiveButton('friends')}><img src={activeButton === 'friends' ? (mediaManager('friendsIconActive')):(mediaManager('friendsIcon'))}/></Button>
        <Button onClick={() => changeActiveButton('wallet')}><img src={activeButton === 'wallet' ? (mediaManager('walletIconActive')):(mediaManager('walletIcon'))}/></Button>
    </Box>
}

export default observer(NavBar)
