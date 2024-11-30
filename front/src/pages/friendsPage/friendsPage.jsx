import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import NavBar from '../../components/nav/navBar';
import AirdropItem from '../../components/airdropItem/airdropItem';
import ReferalItem from '../../components/referalItem/referalItem';
import clientStore from '../../stores/clientStore';

function FriendsPage() {
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: "80vh", overflowX: 'hidden', padding: 5, width: "80%"}}>
      <Slide direction='down' in={true} timeout={{enter: 800}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{marginTop: 2}}>
            <Typography variant='h1' fontWeight={"regular"} letterSpacing={"1.57px"} color={"white"} fontSize={"23px"} textAlign={"center"}> You get 40% of your friend's subscription purchase</Typography>
            </Box>
        </Box>
      </Slide>
      <Slide direction='up' in={true} timeout={{enter: 800}}>
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', marginTop: 2}}>
                  <Button sx={{textTransform: 'none',backgroundColor: 'white', minWidth: '30vh', padding: 2}}>
                            <a href={`https://t.me/share/url?url=https://t.me/TONterritoryBot?start=${clientStore.user.id}&text=`} sx={{textTransform: 'none', backgroundColor: 'white', minWidth: '40vh', padding: 2, color: 'white'}}>
                        <Typography fontSize={20}>Invite Friends</Typography>
                            </a>
                  </Button>
                </Box>

          
          <Box width={"100%"}>
              
              <Box sx={{display: 'flex', gap: 1, marginTop: 6}}>
                  <img src={mediaManager('referalCountImage')}/>
                  <Typography fontWeight={"regular"} letterSpacing={"1.57px"} color={"white"} fontSize={"18px"} textAlign={"center"}>{clientStore.user.referals.length}</Typography>
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2, maxHeight: "60vh", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', gap: 3, width: "100%"}}>
                  {clientStore.user.referals.map((referal, index) => (
                    <ReferalItem referal={referal} count={index}/>
                  ))}
              </Box>
              
              
          </Box>
        </Box>
      </Slide>
  </Box>
}

export default observer(FriendsPage)
