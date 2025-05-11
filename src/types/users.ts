export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface SignInUser {
  nickname: string;
  password: string;
}

export interface SignUpUser {
  name: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export interface User {
  id: number;
  name: string;
  nickname: string;
  role: UserRole;
}
