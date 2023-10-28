import { axiosInstance } from "./axiosInstance";

//register User
export const RegisterUser = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/user/register",payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

//login User
export const LoginUser = async(payload) =>{
    try {
        const response=await axiosInstance.post("/api/user/login",payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}