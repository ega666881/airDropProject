import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import HistoryItem from '../../components/historyItem/historyItem';
import NavBar from '../../components/nav/navBar';

function WalletPage() {
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 3}}>
      <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box>
            <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={mediaManager('tonLogo')} sizes=''/>
            </Box>
            <Box sx={{marginTop: 2}}>
            <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"53px"} textAlign={"center"}>Connect TON wallet</Typography>
            </Box>
            <Box sx={{marginTop: 2}}>

            </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box sx={{marginTop: 7, maxHeight: 250, overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF'}}>
            <Button sx={{textTransform: 'none', backgroundColor: 'white', minWidth: '40vh', padding: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, textTransform: 'none', color: 'black', width: "100%", justifyContent: 'center'}}>
                    <img src={mediaManager('connectWalletIcon')}/><Typography fontWeight={"bold"}>Connect</Typography>
                </Box>
            </Button>
        </Box>
      </Slide>
  </Box>
}

export default observer(WalletPage)
