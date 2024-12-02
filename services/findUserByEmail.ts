import { User } from "../types/user"
import api from "../api";

export function findUserByEmail(email: string, password: string): Promise<User | undefined> {
  return api
    .post(`users/login`, { email, password })
    .then(response => {
      return response.data.user as User
    })
    .catch(error => {
      console.error("Error while trying to find user by email: ", JSON.stringify(error))
      return undefined
    });
}
