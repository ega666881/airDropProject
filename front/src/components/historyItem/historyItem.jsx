import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import { backendIp } from '../../utils/request';

function HistoryItem({airdrop}) {
  const navigate = useNavigate()
  return  <Box sx={{display: 'flex', flexDirection: 'row', justifySelf: 'center', marginLeft: 0, gap: 2, borderBottom: "1px solid", borderColor: "rgba(255, 255, 255, 0.3)", minWidth: '100%', padding: 1, paddingBottom: 3}}>
    <Box>
        <img src={mediaManager('arrowDown')}/>
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 15}}>
        <Box>
            <Box sx={{display: "flex", flexDirection: 'column'}}>
                <Typography color={"white"} fontSize={22} fontWeight={"Bold"}>AIRDROP {airdrop.airdropName}</Typography>
                <Typography color={"#63C67C"} fontSize={18} fontWeight={"Bold"}>+{airdrop.profit} {airdrop.airdropName}</Typography>
            </Box>
        </Box>
        <Box sx={{justifyContent: 'center', alignSelf: 'center'}}>
            <img src={mediaManager('checkMark')}/>
        </Box>
    </Box>
  </Box>
}

export default observer(HistoryItem)
