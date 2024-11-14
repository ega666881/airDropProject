import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/mainPage/homePage';
import AirdropPage from '../pages/airdropPage/airdropPage';
import FriendsPage from '../pages/friendsPage/friendsPage';
import WalletPage from '../pages/walletPage/walletPage';
import MiniGamePage from '../pages/miniGamePage/miniGamePage';
import AirdropInfoPage from '../pages/airdropInfoPage/airdropInfoPage';

const RoutesComponent = (props) => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/airdrop' element={<AirdropPage />}/>
            <Route path='/friends' element={<FriendsPage />}/>
            <Route path='/wallet' element={<WalletPage />}/>
            <Route path='/miniGame/:id' element={<MiniGamePage />}/>
            <Route path='/airdropInfo/:id' element={<AirdropInfoPage />}/>
            {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
    )
}

export default RoutesComponent