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

//get current user
export const GetCurrentUser = async()=>{
    try {
        const response = await axiosInstance.get("/api/user/get-current-user")
        return response.data;
    } catch (error) {
        return error.message
    }
}

//get all users
export const GetAllUsers = async()=>{
    try {
        const response = await axiosInstance.get("/api/user/get-users");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//update user status
export const UpdateUserStatus = async(id,status)=>{
    try {
        const response = await axiosInstance.put(
            `/api/user/update-user-status/${id}`,
            {status}
        )
        return response.data;
    } catch (error) {
        return error.message;
    }
}