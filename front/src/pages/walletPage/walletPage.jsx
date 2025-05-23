import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress, Slide} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mediaManager from '../../components/mediaManager/mediaManager';
import HistoryItem from '../../components/historyItem/historyItem';
import NavBar from '../../components/nav/navBar';
import { useTonConnectUI } from '@tonconnect/ui-react'
import clientStore from '../../stores/clientStore';



function WalletPage() {
    const [tonConnectUI, setOptions] = useTonConnectUI()
    let subscribeCost = clientStore.settings.subscribeCost
    let referalMoney = 0
    if (clientStore.settings.discount > 0) {
        subscribeCost = clientStore.settings.subscribeCost - (clientStore.settings.subscribeCost * clientStore.settings.discount / 100)
        clientStore.setSubscribeDiscount(subscribeCost)

    } else if (clientStore.user.discount > 0) {
        subscribeCost = clientStore.settings.subscribeCost - (clientStore.settings.subscribeCost * clientStore.user.discount / 100)
        clientStore.setSubscribeDiscount(subscribeCost)
    }
    if (clientStore.user.referalWallet) {
        referalMoney = subscribeCost * 40 / 100
        subscribeCost = subscribeCost - referalMoney
    }
    useEffect(() => {
        if (tonConnectUI.wallet) {
            clientStore.addWallet(tonConnectUI.wallet.account.address)
        }
        
    }, [])

    const sendTrans = async () => {
        
        const data = await clientStore.createTransaction()
        
        
        const transaction = {
            validUntil: Math.floor(new Date() / 1000) + 360,
            messages: [
              {
                address: "UQAcZnseCeTDeJjeUap0Kl2HCkDX4AhChociGvUKvHnUbY7t",
                amount: `${subscribeCost.toFixed(2) * 1000000000}`,
                payload: data.payload,
              },
              
            ],
            
          };
        
        if (clientStore.user.referalWallet) {
            transaction.messages.push(
                {
                    address: clientStore.user.referalWallet,
                    amount: `${referalMoney * 1000000000}`,
                },
            )
        }
        tonConnectUI.sendTransaction(transaction)
    }

    return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 3}}>
        <Slide direction='down' in={true} timeout={{enter: 800}}>
            <Box>
                <Box sx={{marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={mediaManager('tonLogo')} width={"50%"}/>
                </Box>
                <Box sx={{marginTop: 2}}>
                    <Typography variant='h1' fontWeight={"bold"} letterSpacing={"2.23px"} color={"white"} fontSize={"40px"} textAlign={"center"}>Connect TON wallet</Typography>
                </Box>
                <Box sx={{marginTop: 2}}>

                </Box>
            </Box>
        </Slide>
        <Slide direction='up' in={true} timeout={{enter: 800}}>
            <Box sx={{marginTop: 7, maxHeight: 350, overflowX: 'hidden', scrollbarColor: '#00E5FF'}}>
                <Button sx={{textTransform: 'none', backgroundImage: tonConnectUI.wallet ? ("url(https://media1.tenor.com/m/7TsSID1mzUIAAAAd/glitter-purple.gif)"):(''),
                                backgroundColor: 'white', minWidth: '40vh', padding: 2}}>
                    {tonConnectUI.wallet ? (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2,textTransform: 'none', color: 'black', width: "100%", justifyContent: 'center'}}
                            onClick={sendTrans}>
                            <Typography fontWeight={"bold"} fontSize={21}>Buy subscription <br />{clientStore.subscribeDiscount ? (<>
                                <Typography fontWeight={"bold"} fontSize={21} sx={{textDecoration: 'line-through'}}>
                                    {clientStore.settings.subscribeCost} TON
                                </Typography>
                                {clientStore.subscribeDiscount} TON 
                            </>):(<>
                                {clientStore.settings.subscribeCost} TON
                            </>)}</Typography>
                        </Box>
                    ):(
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, textTransform: 'none', color: 'black', width: "100%", justifyContent: 'center'}}
                            onClick={() => tonConnectUI.openModal()}>
                            <img src={mediaManager('connectWalletIcon')}/><Typography fontWeight={"bold"}>Connect</Typography>
                        </Box>
                    )}
                </Button>
                <Box sx={{marginBottom: "30%"}}>
                    {tonConnectUI.wallet && <Button sx={{textTransform: 'none', backgroundColor: 'white', minWidth: '40vh', padding: 2, marginTop: 2, color: 'black'}} 
                            onClick={() => {tonConnectUI.disconnect(); tonConnectUI.openModal()}}>
                        <Typography fontWeight={"bold"} fontSize={20}>Change wallet</Typography>
                    </Button>}
                </Box>
            </Box>
        </Slide>
    </Box>
}

export default observer(WalletPage)
