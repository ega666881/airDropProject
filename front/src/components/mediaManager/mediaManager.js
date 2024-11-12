import { useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import logoIcon from '../../assets/pfp.svg'
import arrowDown from '../../assets/Group 206.svg'
import arrowUp from '../../assets/Group 206 (1).svg'
import checkMark from '../../assets/Group 91.svg'
import homeIconActive from '../../assets/Group 231.svg'
import airdropIcon from '../../assets/Group 232.svg'
import friendsIcon from '../../assets/Group 233.svg'
import walletIcon from '../../assets/Group 234.svg'
import friendsIconActive from '../../assets/Group 233 (1).svg'
import walletIconActive from '../../assets/Group 234 (1).svg'
import airdropIconActive from '../../assets/Group 232 (1).svg'
import homeIcon from '../../assets/Group 231 (1).svg'
import airdropItemIcon from '../../assets/Rectangle 4179.svg'
import airdropLogo from '../../assets/Group 212.svg'
import referalAvatar from '../../assets/Frame 183.svg'
import referalCountImage from '../../assets/Vector.svg'
import tonLogo from '../../assets/Group 31.svg'
import connectWalletIcon from '../../assets/Group 170.svg'



function mediaManager(assetName) {
    const assets = {
        logoIcon: logoIcon,
        arrowDown: arrowDown,
        arrowUp: arrowUp,
        checkMark: checkMark,
        homeIconActive: homeIconActive,
        airdropIcon: airdropIcon,
        friendsIcon: friendsIcon,
        walletIcon: walletIcon,
        friendsIconActive: friendsIconActive,
        walletIconActive: walletIconActive,
        airdropIconActive: airdropIconActive,
        homeIcon: homeIcon,
        airdropItemIcon: airdropItemIcon,
        airdropLogo: airdropLogo,
        referalCountImage: referalCountImage,
        referalAvatar: referalAvatar,
        tonLogo: tonLogo,
        connectWalletIcon: connectWalletIcon,
    }

    if (assetName in assets) {
        return assets[assetName]
        
    } else {
        throw new Error(`Ошибка! Изображение ${assetName} не найдено.`)
    }
}

export default mediaManager
