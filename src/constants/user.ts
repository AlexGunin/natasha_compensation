import { UserRole } from "../types/users";

export const USER_ROLE_STR: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Админ",
  [UserRole.USER]: "Пользователь",
};
