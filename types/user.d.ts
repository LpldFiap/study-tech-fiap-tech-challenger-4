export type User = {
  id?: string;
  name: string
  email: string
  password: string
  role: "student" | "teacher" | "admin"
  _id?: string
}

export type AuthContextType = {
  authenticatedUser: User | null;
  authenticateUser: ({ email, password }: { email: string; password: string }) => Promise<User | null>;
  logoutUser: (navigation: any) => Promise<void>;
};
export type TUserRole = 'student' | 'teacher' | 'admin';
export type TUser = {
  name: string;
  email: string;
  role: TUserRole;
  _id?: string;
  password?: string;
  createdAt?: string;
}
