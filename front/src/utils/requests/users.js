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




