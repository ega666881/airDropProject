import axios from "../axios";

export const getUser = async (tgId) => {
    try {
        const response = await axios.get(`/users/get-user/${tgId}`);
        return response;

    } catch (err) {
        return err.response;
    }
    
  };

export const getAirdrops = async () => {
    try {
        const response = await axios.get("/users/get-airdrops");
        return response;

    } catch (err) {
        return err.response;
    }
    
  };

export const getSettings = async () => {
    try {
        const response = await axios.get("/users/get-settings");
        return response;

    } catch (err) {
        return err.response;
    }
    
  };


export const addCoins = async (userId, airdropId, coins) => {
    try {
        const response = await axios.post("/users/add-coins", {userId: userId, airdropId: airdropId, coins: Number(coins)});
        return response;

    } catch (err) {
        return err.response;
    }
    
  };
  

export const addWallet = async (tgId, wallet) => {
    try {
        const response = await axios.put("/users/add-wallet", {tgId: tgId, wallet: wallet});
        return response;

    } catch (err) {
        return err.response;
    }
    
  };


export const joinAirdrop = async (userId, airdropId) => {
    try {
        const response = await axios.post("/users/join-airdrop", {userId: userId, airdropId: airdropId});
        return response;

    } catch (err) {
        return err.response;
    }
    
  };


export const createTransaction = async (userId) => {
    try {
        const response = await axios.post("/users/create-transaction", {userId: userId});
        return response;

    } catch (err) {
        return err.response;
    }
    
  };




