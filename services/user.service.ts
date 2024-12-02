import { TUser, TUserRole } from "../types/user";
import { httpRequest } from "./http.services";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'https://study-tech-phi.vercel.app/';

export const getUserRole = async (): Promise<TUserRole | null> => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData.role;
  }
  return null;
};

export const getUserName = async (): Promise<string | null> => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData.name;
  }
  return null;
};

export const getUser = async (): Promise<TUser | null> => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const getUserId = async (): Promise<string> => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData._id || '';
  }
  return '';
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('user');
};

export const getAllUsers = async (): Promise<TUser[]> => {
  const response = await httpRequest(`${BASE_API}users`, { method: 'GET' });
  return response as TUser[] || [];
};

export const getUserById = async (id: string): Promise<TUser | null> => {
  const response = await httpRequest(`${BASE_API}users/${id}`, { method: 'GET' });
  return response as TUser;
};

export const createUser = async (user: TUser): Promise<TUser> => {
  const response = await httpRequest(`${BASE_API}users`, { method: 'POST', body: user });
  return response as TUser;
};

export const updateUser = async ({ id, userData }: { id: string, userData: TUser }): Promise<TUser> => {
  const response = await httpRequest(`${BASE_API}users/${id}`, { method: 'PUT', body: { ...userData, user_id: id } });
  return response as TUser;
};

export const deleteUser = async ({ id, user_id }: { id: string, user_id: string }): Promise<boolean> => {
  await httpRequest(`${BASE_API}users/${id}`, { method: 'DELETE', body: { user_id } });
  return true;
};
