export type User = {
  name: string
  email: string
  password: string
  role: "student" | "teacher" | "admin"
  _id?: string
}

export type AuthContextType = {
  authenticatedUser: User | null;
  authenticateUser: ({ email, password }: { email: string; password: string }) => Promise<User | null>;
  logoutUser: () => Promise<void>; // Adicione esta linha
};
export type TUserRole = 'student' | 'teacher';
export type TUser = {
  name: string;
  email: string;
  role: TUserRole;
  _id?: string;
  password?: string;
  createdAt?: string;
}
