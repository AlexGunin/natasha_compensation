import { UserRole } from "./users";

export interface NavigationItem {
  to: string;
  title: string;
  role?: UserRole;
  condition?: () => boolean;
}
