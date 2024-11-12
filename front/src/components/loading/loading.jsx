import React, { FC, useEffect } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography, CircularProgress} from '@mui/material';

const Loading = ({}) => {
  return ( 
      <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}>
          <Box>
          <CircularProgress />
        </Box>
      </Box>
  ) 
}

export default Loading