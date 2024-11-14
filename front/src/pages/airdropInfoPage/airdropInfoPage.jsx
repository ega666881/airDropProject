import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide, Tabs, Tab} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import HistoryItem from '../../components/historyItem/historyItem';
import NavBar from '../../components/nav/navBar';
import { useNavigate, useParams } from 'react-router-dom';
import clientStore from '../../stores/clientStore';
import Loading from '../../components/loading/loading'

function AirDropInfoPage() {
    const {id} = useParams()
    const [airdrop, setAirdrop] = useState(null)
    const [seconds, setSeconds] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [tab, setTab] = useState(1)
    if (!airdrop) {
        clientStore.airdrops.map((airdrop) => {
            if (airdrop.id == id) {
                setAirdrop(airdrop)
                setSeconds(airdrop.endDate - Math.floor(new Date().getTime() / 1000))
            }
        })
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
      };
    const { hours, minutes, seconds: remainingSeconds } = formatTime(seconds);
    const handleChange = (event, newValue) => {
        setTab(newValue)
    };
    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
        } else if (!isActive && seconds === 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);
    
    const navigate = useNavigate()
    
    if (!airdrop) {
        return <Loading />
    }

    return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Slide direction='down' in={true} timeout={{enter: 800}}>
            <Box>
                <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'center'}}>
                    <img src={airdrop.coinLogoUrl} width={"100%"}/>
                </Box>
                <Box>
                    <Box sx={{marginTop: 2}}>
                        <Typography variant='h1' fontWeight={"regular"} letterSpacing={"2.23px"} color={"white"} fontSize={"53px"} textAlign={"center"}>${airdrop.name}</Typography>
                    </Box>
                    <Box sx={{marginTop: 2, display: 'flex', justifyContent: 'center'}}>
                        {/* <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"22px"} textAlign={"center"}>ACTIVE</Typography>
                        <Typography variant='h3' fontWeight={"bold"} letterSpacing={"0px"} color={"#767676"} fontSize={"22px"} textAlign={"center"}>Subscription</Typography> */}
                        <Typography variant="h6" color={'#00E5FF'} fontSize={"40px"}>
                            {String(hours).padStart(2, '0')}:
                            {String(minutes).padStart(2, '0')}:
                            {String(remainingSeconds).padStart(2, '0')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
        </Slide>
        <Slide direction='up' in={true} timeout={{enter: 800}}>
            <Box sx={{marginTop: -4, maxHeight: "100%", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF'}}>
                <Tabs aria-label="basic tabs example"
                        value={tab}
                        onChange={handleChange}
                        TabIndicatorProps={{style: { bottom: '23px', backgroundColor: '#00E5FF'}}}
                        sx={{minHeight: 80, marginTop: 5}}
                        variant="scrollable"
                    >
                    <Tab label="AIRDROP" sx={{fontSize: '25px', textTransform: 'none', fontWeight: 'bold'}}/>
                    <Tab label="PROJECT INFO" sx={{fontSize: '25px', textTransform: 'none', fontWeight: 'bold'}} />
                </Tabs>
                <Box sx={{backgroundColor: "#101010", width: "100%", minHeight: "16vh", borderRadius: 5}}>
                    {tab === 0 ? (
                        <>{airdrop.subscribeCheck && <Box padding={2}>
                        <Typography fontWeight={"regular"} letterSpacing={"2.23px"} color={"white"} fontSize={"20px"} textAlign={"center"}>join the telegram channel</Typography>
                    </Box>}</>
                    ):(
                        <Box padding={2}>
                            <Typography fontWeight={"regular"} letterSpacing={"2.23px"} color={"white"} fontSize={"20px"} textAlign={"start"}>{airdrop.projectInfo}</Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 2}}>
                    <Button sx={{textTransform: 'none', backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, width: "50%"}} 
                        onClick={() => navigate(`/miniGame/${airdrop.id}`)}>JOIN AIRDROP</Button>
                </Box>
            </Box>
        </Slide>
    </Box>
}

export default observer(AirDropInfoPage)
