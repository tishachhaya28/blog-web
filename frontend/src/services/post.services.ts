import axiosInstance from "./axiosInstance"

export const getPosts = async () => {
    try {
        const response = await axiosInstance.get("/posts/get-posts");
        return response;
    } catch (error: any) {
        console.log("error while fetching posts", error.message);
        throw error;
    }
}

export const createPost = async (postData: any) => {
    try {
        const response = await axiosInstance.post("/posts/create", postData);
        return response;
    } catch (error: any) {
        console.log("error while creating post", error.message);
        throw error;
    }
}

export const updatePost = async ({postData, postId}: any) => {
    try {
        const response = await axiosInstance.put(`/posts/update/${postId}`, postData);
        return response;
    } catch (error: any) {
        console.log("error while creating post", error.message);
        throw error;
    }
}

export const deletePost = async (postId: any) => {
    try {
        const response = await axiosInstance.delete(`/posts/delete/${postId}`);
        return response;
    } catch (error: any) {
        console.log("error while deleting post", error.message);
        throw error;
    }
}
