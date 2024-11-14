import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import { backendIp } from '../../utils/request';

function ReferalItem({referal, count}) {
    const navigate = useNavigate()
    return  <Box sx={{display: 'flex', flexDirection: 'row', width: "100%", justifySelf: 'center', marginLeft: 0, gap: 2, borderBottom: "1px solid",borderColor: "rgba(255, 255, 255, 0.3)", minWidth: '100%',
    padding: 1,  paddingBottom: 3}}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
        <Typography color={"white"} fontSize={22} fontWeight={"Bold"} textAlign={'center'}>{count + 1}</Typography>
        <Box position="relative" display="inline-block">
            <img src={mediaManager('referalAvatar')} style={{ width: '100%', height: 'auto' }} alt="Referal Avatar" />
            <Typography 
                color={"white"} 
                fontSize={40} 
                fontWeight={"bold"} 
                textAlign={'center'} 
                position="absolute" 
                top="41%" 
                left="50%" 
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                {referal.username.charAt(0)}
            </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Box>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                    <Typography color={"white"} fontSize={15} fontWeight={"Bold"}>{referal.username}</Typography>
                    
                </Box>
          </Box>
          <Box sx={{justifyContent: 'center', alignSelf: 'center', display: 'flex', gap: 0.5}}>
          <img src={mediaManager('referalCoinLogo')} />
            <Typography color={"#00E5FF"} fontSize={15} fontWeight={"Bold"} textAlign={'center'}>{referal.profit}</Typography>
          </Box>
      </Box>
    </Box>
}
  
export default observer(ReferalItem)
