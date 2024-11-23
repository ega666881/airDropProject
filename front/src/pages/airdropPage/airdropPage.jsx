import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import NavBar from '../../components/nav/navBar';
import AirdropItem from '../../components/airdropItem/airdropItem';
import clientStore from '../../stores/clientStore';
import { useNavigate } from 'react-router-dom';


function AirDropPage() {
  const navigate = useNavigate()
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: "80vh", overflowY: 'hidden'}}>
    <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{marginTop: 5, justifyContent: 'center', alignItems: "center"}}>
              {/* <img src={mediaManager('airdropLogo')}/> */}
            </Box>
            <Box sx={{marginTop: 2}}>
              <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"26px"} textAlign={"center"}>Your subscription is</Typography>
            </Box>
            <Box sx={{marginTop: 2}}>
              <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"26px"} textAlign={"center"}>
                  {clientStore.user.subscription ? (<>active</>):(
                    <Button sx={{textTransform: 'none', backgroundImage: "url(https://media1.tenor.com/m/7TsSID1mzUIAAAAd/glitter-purple.gif)", backgroundColor: 'white', minWidth: '40vh', padding: 2}}>
                      <Box sx={{display: 'flex', alignItems: 'center', gap: 2,textTransform: 'none', color: 'black', width: "100%", justifyContent: 'center'}}
                            onClick={() => {navigate('/wallet'); clientStore.setActiveButton('wallet')}}>
                            <Typography fontWeight={"bold"} fontSize={25}>Buy subscription</Typography>
                        </Box>
                    </Button>
                  )}
                </Typography>
            </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 7, maxHeight: "60vh", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', gap: 3}}>
            {clientStore.airdrops.map((airdrop) => (
              <AirdropItem airdrop={airdrop} />
            ))}
        </Box>
      </Slide>
  </Box>
}

export default observer(AirDropPage)
