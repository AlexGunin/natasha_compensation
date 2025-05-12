import { ActionIcon, Avatar, Flex, Popover } from "@mantine/core";
import { Navigation } from "./navigation";
import { LogOut } from "lucide-react";
import { NavigationItem } from "../types/navigation";
import { useUserContext } from "../providers/user-provider";
import { authService } from "../services/auth-service";
import { User } from "../types/users";
import { ThemeBtn } from "./theme-btn";

const NAVIGATION_ITEMS = [
  {
    to: "/sign-in",
    title: "Вход",
    condition: () => !authService.me,
  },
  {
    to: "/sign-up",
    title: "Регистрация",
    condition: () => !authService.me,
  },
  {
    to: "/",
    title: "Инструкция",
    shouldUser: true,
  },
  {
    to: "/catalog",
    title: "Каталог",
    shouldUser: true,
  },
  {
    to: "/cart",
    title: "Корзина",
    shouldUser: true,
  },
] satisfies NavigationItem[];

interface UserAvatarProps {
  user: User;
}

const UserAvatar = (props: UserAvatarProps) => {
  return (
    <Popover position="top" withArrow shadow="md">
      <Popover.Target>
        {props.user.nickname === "anonym" ? (
          <Avatar radius="xl" />
        ) : (
          <Avatar color="gray" radius="xl" size="md">
            {props.user.nickname.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Flex gap="md" justify="center">
          <ThemeBtn />
          <ActionIcon
            onClick={authService.logout}
            variant="light"
            color="gray"
            size="xl"
            radius="xl"
          >
            <LogOut size={24} />
          </ActionIcon>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export const DockBar = () => {
  const user = useUserContext();

  return (
    <Flex gap="md" align="center" justify="space-between">
      <Navigation
        items={NAVIGATION_ITEMS.filter((item) => {
          if (item.condition) {
            return item.condition();
          }

          return user ? true : !item.shouldUser;
        })}
      />
      {user ? <UserAvatar user={user} /> : <ThemeBtn></ThemeBtn>}
    </Flex>
  );
};
