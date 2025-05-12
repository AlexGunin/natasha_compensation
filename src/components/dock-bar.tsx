import { Avatar, Flex, Menu, useMantineColorScheme } from "@mantine/core";
import { Navigation } from "./navigation";
import { LogOut, Moon, Sun, CirclePlus } from "lucide-react";
import { NavigationItem } from "../types/navigation";
import { useUserContext } from "../providers/user-provider";
import { authService } from "../services/auth-service";
import { User, UserRole } from "../types/users";
import { ThemeBtn } from "./theme-btn";
import { BenefitForm } from "./catalogs/benefit-form";
import { useDrawerContext } from "../providers/drawer-provider";

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

const AdminMenu = () => {
  const { open, close } = useDrawerContext();

  return (
    <>
      <Menu.Label>Для админа</Menu.Label>
      <Menu.Item
        leftSection={<CirclePlus size={16} />}
        onClick={() => {
          open({
            children: <BenefitForm onSubmit={close} />,
            title: `Создание льготы`,
          });
        }}
      >
        Создать льготу
      </Menu.Item>
      <Menu.Divider />
    </>
  );
};

const UserAvatar = (props: UserAvatarProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const user = useUserContext();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {props.user.nickname === "anonym" ? (
          <Avatar radius="xl" />
        ) : (
          <Avatar color="gray" radius="xl" size="md">
            {props.user.nickname.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {user?.role === UserRole.ADMIN && <AdminMenu />}
        <Menu.Item
          leftSection={
            colorScheme === "dark" ? <Moon size={16} /> : <Sun size={16} />
          }
          onClick={toggleColorScheme}
        >
          Управление темой
        </Menu.Item>
        <Menu.Item
          leftSection={<LogOut size={16} />}
          onClick={authService.logout}
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
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
      {user ? <UserAvatar user={user} /> : <ThemeBtn />}
    </Flex>
  );
};
