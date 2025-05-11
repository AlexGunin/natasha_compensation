import { UserRole } from "./users";

export interface NavigationItem {
  to: string;
  title: string;
  shouldUser?: boolean;
  role?: UserRole;
  condition?: () => boolean;
}
