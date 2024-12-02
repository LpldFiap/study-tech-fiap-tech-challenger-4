import { TPost } from "../types/posts";
import { httpRequest } from "./http.services"

const BASE_API = 'https://study-tech-phi.vercel.app/';

export const getAllPosts = async (): Promise<TPost[]> => {
    const response = await httpRequest(`${BASE_API}posts`, { method: 'GET' });
    return response as TPost[] || [];
}

export const getPostById = async (id: string): Promise<TPost> => {
    const response = await httpRequest(`${BASE_API}posts/${id}`, { method: 'GET' });
    return response as TPost;
}

export const createPost = async ({ post, user_id }:{post: TPost, user_id: string}): Promise<TPost> => {
    const response = await httpRequest(`${BASE_API}posts`, { method: 'POST', body: {...post, user_id} });
    return response as TPost;
}

export const updatePost = async ({ post, user_id }:{post: TPost, user_id: string}): Promise<TPost> => {
    const response = await httpRequest(`${BASE_API}posts/${post._id}`, { method: 'PUT', body: {...post, user_id} });
    return response as TPost;
}

export const deletePost = async ({id, user_id}:{id: string, user_id: string}): Promise<void> => {
    await httpRequest(`${BASE_API}posts/${id}`, { method: 'DELETE', body:{user_id} });
}