import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType, TUserRole, User } from "../types/user";
import { findUserByEmail } from "../services/findUserByEmail";

// Tipo para o usuário autenticado
type AuthenticatedUser = Omit<User, "password">; // Exclui a senha do tipo User

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  // Método para autenticar o usuário
  const authenticateUser = useCallback(
    async ({ email, password }: { email: string; password: string }): Promise<User | null> => {
      const foundUser = await findUserByEmail(email, password);

      if (foundUser) {
        const user: User = {
          ...foundUser,
          password, // Adiciona a senha ao usuário completo
        };

        setAuthenticatedUser(user);
        await AsyncStorage.setItem("authenticatedUser", JSON.stringify(user));

        return user;
      } else {
        console.error("Error login: User not found");
        return null;
      }
    },
    []
  );

  // Carregar dados do usuário ao inicializar o contexto
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("authenticatedUser");
        if (storedUser) {
          setAuthenticatedUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user from storage:", error);
      }
    };

    loadUserFromStorage();
  }, []);

  // Método para deslogar o usuário
  const logoutUser = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("authenticatedUser");
      setAuthenticatedUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticatedUser, authenticateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthUserProvider;
