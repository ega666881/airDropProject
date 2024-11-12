import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import NavBar from '../../components/nav/navBar';
import AirdropItem from '../../components/airdropItem/airdropItem';
import ReferalItem from '../../components/referalItem/referalItem';

function FriendsPage() {
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: "80vh", overflowX: 'hidden', padding: 5}}>
      <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{marginTop: 2}}>
            <Typography variant='h1' fontWeight={"regular"} letterSpacing={"1.57px"} color={"white"} fontSize={"23px"} textAlign={"center"}> You get 40% of your friend's subscription purchase</Typography>
            </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box>
            <Box sx={{display: 'flex', gap: 1, marginTop: 6}}>
                <img src={mediaManager('referalCountImage')}/>
                <Typography fontWeight={"regular"} letterSpacing={"1.57px"} color={"white"} fontSize={"18px"} textAlign={"center"}>20</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2, maxHeight: "60vh", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', gap: 3}}>
                {[1, 2, 3, 4, 1, 2, 3, 4].map(() => (
                <ReferalItem />
                ))}
            </Box>
        </Box>
      </Slide>
  </Box>
}

export default observer(FriendsPage)
