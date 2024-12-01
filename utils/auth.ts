import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser } from '../types/user';

export async function checkAuth(): Promise<string | null> {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.email) {
        return parsedUser.role; 
      }
    }
    return null;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return null;
  }
}

export async function saveUser({ name, email, role, _id }: TUser): Promise<void> {
  try {
    const user = { name, email, role, _id };
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}
