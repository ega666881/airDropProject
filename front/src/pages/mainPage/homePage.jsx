import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import HistoryItem from '../../components/historyItem/historyItem';
import NavBar from '../../components/nav/navBar';
import clientStore from '../../stores/clientStore';
import Loading from '../../components/loading/loading';

function HomePage() {
  if (!clientStore.user) {
    return <Loading />
  }
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "100%", overflowX: 'hidden'}}>
      <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box maxWidth={"100%"}>
          <Box>
            <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'center'}}>
              <img src={mediaManager('logoIcon')} width={"50%"}/>
            </Box>
          </Box>
          <Box>
            <Box sx={{marginTop: 2, maxWidth: "100%"}}>
              <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"40px"} textAlign={"center"}>{clientStore.user.username}</Typography>
            </Box>
            <Box sx={{marginTop: 2}}>
              <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"22px"} textAlign={"center"}>{clientStore.user.subscription ? (<>ACTIVE</>):(<>INACTIVE</>)}</Typography>
              <Typography variant='h3' fontWeight={"bold"} letterSpacing={"0px"} color={"#767676"} fontSize={"22px"} textAlign={"center"}>Subscription</Typography>
            </Box>
          </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box sx={{marginTop: 7, maxHeight: 300, overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', marginBottom: "30%", width: '100%'}}>
          {clientStore.user.airdropsHistory.map((airdrop) => (
            <HistoryItem airdrop={airdrop}/>
          ))}
        </Box>
      </Slide>
      {/* <NavBar /> */}
  </Box>
}

export default observer(HomePage)
