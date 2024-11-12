import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../mediaManager/mediaManager';
import { useNavigate } from 'react-router-dom';
import { backendIp } from '../../utils/request';

function ProductCard({course, buyButton = true}) {
  const navigate = useNavigate()
  return  <Box sx={{backgroundColor: '#FF4C26', borderRadius: 5, boxShadow: 5, padding: 3}}>
   <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <Typography sx={{fontFamily: 'Typography', fontSize: 20, color: "white", width: "100%"}}>{course.name}</Typography>
        <img src={course.school.imageUrl} height={"100%"} width={"50%"}/>
        
   </Box>
   <Box sx={{backgroundColor: 'white', marginTop: 2, borderRadius: 5}}>
        <Button sx={{padding: 1, color: 'black', fontSize: 20, textTransform: 'none', width: '100%'}} onClick={() => {navigate(`/course/${course.id}`)}} inputProps={{backgroundColor: 'white'}}>
          {buyButton ? (<>Купить за {course.cost} ₽</>):(<>{course.cost} ₽</>)}</Button>
          
    </Box>
  </Box>
}

export default observer(ProductCard)
