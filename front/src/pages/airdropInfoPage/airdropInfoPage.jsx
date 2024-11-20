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
    const [airdropJoinded, setAirdropJoined] = useState(false)
    const [infoMessage, setMessage] = useState('')
    const [tab, setTab] = useState(1)
    document.body.style.backgroundImage = ``
    document.body.style.backgroundColor = `black`
    const [errorMessage, setErrorMessage] = useState('')

    if (!airdrop) {
        clientStore.airdrops.map((airdrop) => {
            if (airdrop.id == id) {
                setAirdrop(airdrop)
                setSeconds(airdrop.endDate - Math.floor(new Date().getTime() / 1000))
            }
        })
    }

    

    useEffect(() => {
        clientStore.user.airdropsUsers.map((air) => {
            if (air.airdropId === airdrop.id) {
                setAirdropJoined(true)
            }
        })
    }, [])

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
                    <img src={airdrop.coinLogoUrl} width={"230vh"}/>
                </Box>
                <Box>
                    <Box sx={{marginTop: 2}}>
                        <Typography variant='h1' fontWeight={"regular"} letterSpacing={"2.23px"} color={"white"} fontSize={"53px"} textAlign={"center"}>${airdrop.name}</Typography>
                    </Box>
                    <Box sx={{marginTop: 2, display: 'flex', justifyContent: 'center'}}>
                        {/* <Typography variant='h3' fontWeight={"bold"} letterSpacing={"2.23px"} color={"#FA9817"} fontSize={"22px"} textAlign={"center"}>ACTIVE</Typography>
                        <Typography variant='h3' fontWeight={"bold"} letterSpacing={"0px"} color={"#767676"} fontSize={"22px"} textAlign={"center"}>Subscription</Typography> */}
                        
                        {airdrop.stoped ? (
                            <Typography sx={{backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, textAlign: 'center', width: "100%"}}>NOW</Typography>
                        ):(<>
                            {seconds >= 0 && <Typography variant="h6" color={'#00E5FF'} fontSize={"40px"}>
                                {String(hours).padStart(2, '0')}:
                                {String(minutes).padStart(2, '0')}:
                                {String(remainingSeconds).padStart(2, '0')}
                            </Typography>}
                        </>)}
                    </Box>
                </Box>
            </Box>
            
        </Slide>
        <Slide direction='up' in={true} timeout={{enter: 800}}>
            <Box sx={{marginTop: -4, maxHeight: "100%", overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#00E5FF', width: '100%s'}}>
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
                <Typography fontWeight={"regular"} letterSpacing={"2.23px"} color={"red"} fontSize={"20px"} textAlign={"start"}>{errorMessage}</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 2, marginBottom: "40%", width: "100%"}}>
                    {airdropJoinded ? (<>{airdrop.stoped ? (<>
                        {clientStore.user.admin && 
                                <Box width={"100%"} sx={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                                    <Button sx={{textTransform: 'none', backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, width: "50%"}} 
                                        onClick={() => clientStore.finishAirdrop(airdrop.id, setMessage)}>Finish airdrop
                                    </Button>
                                    <Typography color={"green"}>{infoMessage}</Typography>
                                </Box>
                        }
                    </>):(
                        <>
                        {airdrop.miniGame ? (
                            <Button sx={{textTransform: 'none', backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, width: "50%"}} 
                        onClick={() => navigate(`/miniGame/${airdrop.id}`)}>PLAY GAME</Button>
                        ):(
                            <Button sx={{textTransform: 'none', backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, width: "50%"}} 
                                >YOU JOINED AIRDROP</Button>
                        )}</>
                    )}
                        </>
                    ):(
                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%", justifyContent: 'center', alignItems: 'center', gap: 2}}>
                            {airdrop.subscribeCheck && 
                                <a style={{textTransform: 'none', backgroundColor: '#00E5FF', color: 'white', borderRadius: 24, fontSize: 20, padding: 14, width: "50%", textAlign: 'center'}} 
                                    href={airdrop.channelUrl}>JOIN CHANNEL</a>
                            }
                            <Button sx={{textTransform: 'none', backgroundColor: '#63C67C', color: 'white', borderRadius: 24, fontSize: 20, padding: 1, width: "50%"}} 
                        onClick={() => {clientStore.joinAirdrop(airdrop.id, setAirdropJoined, setErrorMessage)}}>JOIN AIRDROP</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Slide>
    </Box>
}

export default observer(AirDropInfoPage)
