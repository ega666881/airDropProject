import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide, CssBaseline} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import Loading from '../../components/loading/loading'
import clientStore from './../../stores/clientStore';
import { useNavigate, useParams } from 'react-router-dom';

function MiniGamePage() {
    const {id} = useParams()
    const [airdrop, setAirdrop] = useState(null)
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(0)
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(true);
    if (airdrop) {
        
        document.body.style.backgroundImage = `url(${airdrop.backgroundUrl})`
    }
    
    const navigate = useNavigate()

    useEffect(() => {
        clientStore.setHideNavBar(true)
    }, [])

    
    if (!airdrop) {
        clientStore.airdrops.map((airdrop) => {
            if (airdrop.id == id) {
                setAirdrop(airdrop)
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

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
        } else if (!isActive && seconds === 0) {
            console.log(1)
            
            clearInterval(interval);
        }
        if (seconds <= 0) {
        
            clientStore.setHideNavBar(false)
            
            navigate(`/airdropInfo/${airdrop.id}`)
            clientStore.addCoins(airdrop.id, Number(count))
        }
    
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
            setImages((prevImages) => [
                ...prevImages,
                { id: Date.now(), left: Math.random() * 100, opacity: 1 },
            ]);
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const handleImageClick = (id, event) => {
        event.stopPropagation();
        console.log(`Image ID: ${id}`);
        setCount(count + 1)
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };

    const handleAnimationEnd = (id) => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };

    if (!airdrop) {
        return <Loading />
    }

    return (
        <Box position="relative" height="100vh" overflow="hidden">
            <CssBaseline />
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: "20%"}}>
                <Typography variant="h6" color={'#00E5FF'} fontSize={"40px"}>
                    {String(minutes).padStart(2, '0')}:
                    {String(remainingSeconds).padStart(2, '0')}
                </Typography>
                <Typography color={"white"} textAlign={'center'} fontSize={80}>{count}</Typography>
            </Box>
            {images.map((image) => (
                <Box
                    key={image.id}
                    position="absolute"
                    top={0}
                    left={`${image.left}%`}
                    sx={{
                        opacity: image.opacity,
                        transition: 'opacity 1s ease-in-out',
                        animation: 'fallRotate 3s forwards',
                    }}
                    onAnimationEnd={() => handleAnimationEnd(image.id)}
                >
                    <img
                        src={airdrop.coinLogoUrl}
                        alt="Falling"
                        style={{
                            borderRadius: '50%',
                            width: '100%',
                            cursor: 'pointer'
                        }}
                        onTouchStart={(e) => {handleImageClick(image.id, e)}}
                    />
                </Box>
            ))}
            <style jsx>{`
                @keyframes fallRotate {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }`
            }</style>
        </Box>
    );
}

export default observer(MiniGamePage)
