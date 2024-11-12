import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import { backendIp } from '../../utils/request';

function ReferalItem({}) {
    const navigate = useNavigate()
    return  <Box sx={{display: 'flex', flexDirection: 'row', justifySelf: 'center', marginLeft: 0, gap: 2, borderBottom: "1px solid",borderColor: "rgba(255, 255, 255, 0.3)", minWidth: '100%',
    padding: 1,  paddingBottom: 3}}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
        <Typography color={"white"} fontSize={22} fontWeight={"Bold"} textAlign={'center'}>1</Typography>
        <img src={mediaManager('referalAvatar')}/>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Box>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                    <Typography color={"white"} fontSize={15} fontWeight={"Bold"}>Dmitriy K</Typography>
                    <Typography color={"#757575"} fontSize={12} fontWeight={"Bold"}>15,999</Typography>
                </Box>
          </Box>
          <Box sx={{justifyContent: 'center', alignSelf: 'center'}}>
            <Typography color={"#00E5FF"} fontSize={18} fontWeight={"Bold"} textAlign={'center'}>150,577,999</Typography>
          </Box>
      </Box>
    </Box>
}
  
export default observer(ReferalItem)
