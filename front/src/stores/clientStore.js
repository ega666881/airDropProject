import { action, makeAutoObservable, set } from "mobx";
import { getAirdrops, getUser } from "../utils/requests/users";
import axios from "../utils/axios";


class ClientStore {
    user = null
    airdrops = []
    subjects = []
    activeButton = ""
    constructor() {
        makeAutoObservable(this)
    }

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