import { action, makeAutoObservable, set } from "mobx";
import { getAirdrops, getUser, createTransaction, joinAirdrop, addCoins, addWallet, getSettings } from "../utils/requests/users";
import axios from "../utils/axios";


class ClientStore {
    user = null
    airdrops = []
    subjects = []
    settings = {}
    activeButton = ""
    hideNavBar = false
    subscribeDiscount = false
    constructor() {
        makeAutoObservable(this)
    }

    setHideNavBar = action((value) => {
        this.hideNavBar = value
    })

    setSubscribeDiscount = action((newValue) => {
        this.subscribeDiscount = newValue
    })

    setActiveButton = action((newActiveButton) => {
        this.activeButton = newActiveButton
    })

    getAirdrops = action(async () => {
        const response = await getAirdrops()
        switch(response.status) {
            case 200: {
                this.airdrops = await response.data
                break
            } 
        }
    })

    addWallet = action(async (wallet) => {
        const response = await addWallet(Number(this.user.tgId), wallet)
        console.log(response.status)
        switch(response.status) {
            case 201: {
                
                
            } 
        }
    })

    getSettings = action(async () => {
        const response = await getSettings()
        console.log(response.status)
        switch(response.status) {
            case 200: {
                this.settings = await response.data
            } 
        }
    })

    createTransaction = action(async () => {
        const response = await createTransaction(this.user.id)
        console.log(response.status)
        switch(response.status) {
            case 201: {
                return await response.data
                
            } 
        }
    })

    joinAirdrop = action(async (airdropId, setAirdropJoined, setErrorMessage) => {
        const response = await joinAirdrop(this.user.id, airdropId)
        console.log(response.status)
        switch(response.status) {
            case 201: {
                this.user = await response.data
                setAirdropJoined(true)
                setErrorMessage('')
                break
            } 
            case 409: {
                setErrorMessage("Достигнуто максимальное кол-во пользователей")
                break
            }
        }
    })

    addCoins = action(async (airdropId, coins) => {
        const response = await addCoins(this.user.id, airdropId, coins)
        console.log(response.status)
        switch(response.status) {
            case 201: {
                this.user = await response.data
            } 
        }
    })


    getUser = action(async (tgId) => {
        const response = await getUser(tgId)
        switch(response.status) {
            case 200: {
                this.user = await response.data
                console.log(this.user)
                break
            } 
        }
    })

}


const clientStore = new ClientStore();

export default clientStore