import { Flex, Menu, useMantineColorScheme } from "@mantine/core";
import { Navigation } from "./navigation";
import { LogOut, Moon, Sun, CirclePlus, GraduationCap } from "lucide-react";
import { NavigationItem } from "../../types/navigation";
import { useUserContext } from "../../providers/user-provider";
import { authService } from "../../services/auth-service";
import { User, UserRole } from "../../types/users";
import { ThemeBtn } from "../shared/theme-btn";
import { BenefitForm } from "../catalogs/benefit-form";
import { useDrawerContext } from "../../providers/drawer-provider";
import { Avatar } from "../shared/avatar";
import { useRouter } from "@tanstack/react-router";
import { useOnboarding } from "../../providers/onboarding-provider";

const conditions = {
  unauth: () => !authService.getMe(),
  auth: () => !!authService.getMe(),
  admin: () => authService.isAdmin,
} as const;

const NAVIGATION_ITEMS = [
  {
    to: "/sign-in",
    title: "Вход",
    condition: conditions.unauth,
  },
  {
    to: "/sign-up",
    title: "Регистрация",
    condition: conditions.unauth,
  },
  {
    to: "/",
    title: "Каталог",
    condition: conditions.auth,
  },
  {
    to: "/cart",
    title: "Корзина",
    condition: conditions.auth,
  },
  {
    to: "/users",
    title: "Пользователи",
    condition: conditions.admin,
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
  const { startOnboarding } = useOnboarding();
  const { user } = props;
  const router = useRouter()
  const { isActive, getCurrentStep, nextStep } = useOnboarding();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleThemeClick = () => {
    console.log('Theme button clicked, isActive:', isActive);
    
    toggleColorScheme();
    
    // Если это онбординг и клик по кнопке темы
    if (isActive) {
      const currentStep = getCurrentStep();
      console.log('Theme click - current step:', currentStep?.id, 'target:', currentStep?.target);
      
      if (currentStep?.target.includes('theme-btn')) {
        console.log('Theme onboarding step matched, proceeding to next step');
        setTimeout(() => {
          nextStep();
        }, 500);
      }
    }
  };

  return (
    <Menu
      shadow="md"
      width={200}
      openDelay={200}
      trigger="click"
      closeDelay={300}
    >
      <Menu.Target>
        <div 
          data-onboarding="user-avatar"
          onClick={() => {
            console.log('User avatar clicked, isActive:', isActive);
            
            // Если это онбординг и клик по аватару
            if (isActive) {
              const currentStep = getCurrentStep();
              console.log('Avatar click - current step:', currentStep?.id, 'target:', currentStep?.target);
              
              if (currentStep?.target.includes('user-avatar')) {
                console.log('Avatar onboarding step matched, proceeding to next step');
                setTimeout(() => {
                  nextStep();
                }, 500);
              }
            }
          }}
        >
          <Avatar nickname={user.nickname} />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {user.role === UserRole.ADMIN && <AdminMenu />}
        <Menu.Item
          leftSection={
            colorScheme === "dark" ? <Moon size={16} /> : <Sun size={16} />
          }
          onClick={handleThemeClick}
          data-onboarding="theme-btn"
        >
          Управление темой
        </Menu.Item>
        <Menu.Item
          leftSection={
            <GraduationCap size={16} />
          }
          onClick={startOnboarding}
        >
          Онбординг
        </Menu.Item>
        <Menu.Item
          leftSection={<LogOut size={16} />}
          onClick={async () => {
            await authService.logout();
            router.navigate({to: "/sign-in"})
          }}
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
          return item.condition ? item.condition() : true;
        })}
      />
      {user ? <UserAvatar user={user} /> : <ThemeBtn />}
    </Flex>
  );
};
