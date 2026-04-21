import axiosInstance from "./axiosInstance"

export const registerUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        return response;
    } catch (error: any) {
        console.log("error while registering the user", error.message);
        throw error;
    }
}

export const loginUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post("/auth/login", userData);
        return response;
    } catch (error: any) {
        console.log("error while login the user", error.message);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get("/auth/get-users");
        return response;
    } catch (error: any) {
        console.log("error while fetching the users", error.message);
        throw error;
    }
}

export const toggleUser = async (userId: any) => {
    console.log(localStorage.getItem("token"));
    try {
        const response = await axiosInstance.put(`/auth/update/${userId}`);
        return response;
    } catch (error: any) {
        console.log("error while updating the user", error.message);
        throw error;
    }
}