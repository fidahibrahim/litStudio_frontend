import { AxiosResponse } from "axios"
import Api from "../../config/axiosConfig"
import userEndpoints from "../../endpoints/userEndpoints"
import { loginInterface, registerInterface, registerRes } from "../../interface/userInterface"

export const register = async (userData: registerInterface): Promise<AxiosResponse<registerRes>> => {
    try {
        const response = await Api.post(userEndpoints.register, userData)
        return response
    } catch (error) {
        throw error
    }
}

export const login = async (userData: loginInterface) => {
    try {
        const response = await Api.post(userEndpoints.login, userData)
        return response
    } catch (error) {
        throw error
    }
}

export const logout = async (): Promise<AxiosResponse<unknown> | undefined> => {
    try {
        const response = await Api.post(userEndpoints.logout)
        return response
    } catch (error) {
        throw error
    }
}

export const addBlog = async (formData: FormData) => {
    try {
        const response = await Api.post(userEndpoints.addBlog, formData);
        return response
    } catch (error) {
        throw error
    }
}

export const fetchUserBlogs = async (userId: string) => {
    try {
        const response = await Api.get(`${userEndpoints.getUserBlogs}/${userId}`)
        return response
    } catch (error) {
        throw error
    }
}

export const listBlogs = async () => {
    try {
        const response = await Api.get(userEndpoints.listBlogs)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteBlog = async (blogId: string) => {
    try {
        const response = await Api.delete(`${userEndpoints.deleteBlog}/${blogId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchBlogById = async (blogId: string) => {
    try {
        const response = await Api.get(`${userEndpoints.fetchBlogById}/${blogId}`)
        return response
    } catch (error) {
        throw error
    }
}

export const updateBlog = async (formData: FormData) => {
    try {
        const response = await Api.put(userEndpoints.updateBlog, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response
    } catch (error) {
        throw error
    }
}