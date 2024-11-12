import { action, makeAutoObservable, set } from "mobx";
import { getCourses, getSubjects, getUser, createTransaction } from "../utils/requests/users";
import axios from "../utils/axios";


class ClientStore {
    user = {}
    courses = []
    subjects = []
    activeButton = ""
    constructor() {
        makeAutoObservable(this)
    }

    setActiveButton = action((newActiveButton) => {
        this.activeButton = newActiveButton
    })

    createTransaction = action(async (amount) => {
        const response = await createTransaction(Number(this.user.tgId), amount)
        switch(response.status) {
            case 201: {
                const data = await response.data
                window.location.assign(data.payUrl)
                break
            } 
        }

    })

    getCourses = action(async () => {
        const response = await getCourses()
        switch(response.status) {
            case 200: {
                this.courses = await response.data
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

    getSubjects = action(async () => {
        const response = await getSubjects()
        switch(response.status) {
            case 200: {
                this.subjects = await response.data
                break
            } 
        }
    })



}


const clientStore = new ClientStore();

export default clientStore