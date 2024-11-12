import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { backendIp } from '../../utils/request';

function SubjectCard({subject, selectSubject}) {
  console.log(subject)
  return  <Box sx={{overflowX: 'hidden', boxShadow: 5, borderRadius: 11}}>
   <Box>
   <img src={`${subject.imageUrl}`} width={"100%"}/>
   </Box>
   <Box sx={{backgroundColor: 'white', borderRadius: 2, position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', marginLeft: 10, marginTop: -9, minWidth: "50%"}}>
        <Button sx={{padding: 1, color: 'black', fontSize: 20, textTransform: 'none', minWidth: "100%"}} inputProps={{backgroundColor: 'white'}}
        onClick={() => selectSubject(subject)}>Выбрать</Button>
    </Box>
  </Box>
}

export default observer(SubjectCard)
