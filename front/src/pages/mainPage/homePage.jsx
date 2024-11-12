import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import HistoryItem from '../../components/historyItem/historyItem';
import NavBar from '../../components/nav/navBar';

function HomePage() {
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box>
          <Box sx={{marginTop: 5}}>
            <img src={mediaManager('logoIcon')} sizes=''/>
          </Box>
          <Box sx={{marginTop: 2}}>
            <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"53px"} textAlign={"center"}>NAME</Typography>
          </Box>
          <Box sx={{marginTop: 2}}>
            <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"22px"} textAlign={"center"}>ACTIVE</Typography>
            <Typography variant='h3' fontWeight={"bold"} letterSpacing={"0px"} color={"#767676"} fontSize={"22px"} textAlign={"center"}>Subscription</Typography>
          </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box sx={{marginTop: 7, maxHeight: 250, overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF'}}>
          {[1, 2, 3, 4, 1, 2, 3, 4].map(() => (
            <HistoryItem />
          ))}
        </Box>
      </Slide>
      {/* <NavBar /> */}
  </Box>
}

export default observer(HomePage)
