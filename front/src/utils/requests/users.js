import axios from "../axios";

export const getCourses = async () => {
    try {
        const response = await axios.get("/users/get-courses");
        return response;

    } catch (err) {
        return err.response;
    }
    
  };

export const getUser = async (tgId) => {
    try {
        const response = await axios.get(`/users/get-user/${tgId}`);
        return response;

    } catch (err) {
        return err.response;
    }
    
  };

export const createTransaction = async (tgId, amount) => {
    try {
        const response = await axios.post(`/users/create-transaction`, {tgId: tgId, amount: amount});
        return response;

    } catch (err) {
        return err.response;
    }
    
  };

export const getSubjects = async () => {
    try {
        const response = await axios.get("/users/get-subjects");
        return response;

    } catch (err) {
        return err.response;
    }
    
  };




