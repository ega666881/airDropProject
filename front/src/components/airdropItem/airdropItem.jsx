import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import { backendIp } from '../../utils/request';

function AirdropItem({}) {
  const navigate = useNavigate()
  return  <Box sx={{display: 'flex', flexDirection: 'row', justifySelf: 'center', marginLeft: 0, gap: 2, borderBottom: "1px solid", borderColor: "rgba(255, 255, 255, 0.3)", minWidth: '100%', padding: 1, paddingBottom: 3}}>
    <Box>
        <img src={mediaManager('airdropItemIcon')}/>
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 12}}>
        <Box>
            <Box sx={{display: "flex", flexDirection: 'column'}}>
                <Typography color={"white"} fontSize={22} fontWeight={"Bold"}>AIRDROP BTC</Typography>
                <Typography color={"white"} fontSize={18} fontWeight={"Bold"}>1 BTC</Typography>
            </Box>
        </Box>
        <Box sx={{justifyContent: 'center', alignSelf: 'center'}}>
            <Button sx={{textTransform: 'none', backgroundColor: '#00E5FF', color: 'white', borderRadius: 24, padding: 1}}>JOIN</Button>
        </Box>
    </Box>
  </Box>
}

export default observer(AirdropItem)
