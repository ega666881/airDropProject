import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import NavBar from '../../components/nav/navBar';
import AirdropItem from '../../components/airdropItem/airdropItem';

function AirDropPage() {
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: "80vh", overflowY: 'hidden'}}>
    <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{marginTop: 5, justifyContent: 'center', alignItems: "center"}}>
            <img src={mediaManager('airdropLogo')}/>
            </Box>
            <Box sx={{marginTop: 2}}>
            <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"36px"} textAlign={"center"}>Your subscription is</Typography>
            </Box>
            <Box sx={{marginTop: 2}}>
            <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"36px"} textAlign={"center"}>active</Typography>
            </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 7, maxHeight: "40vh", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', gap: 3}}>
            {[1, 2, 3, 4, 1, 2, 3, 4].map(() => (
            <AirdropItem />
            ))}
        </Box>
      </Slide>
  </Box>
}

export default observer(AirDropPage)
