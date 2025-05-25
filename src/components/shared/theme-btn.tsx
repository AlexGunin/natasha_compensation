import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";

export const ThemeBtn = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="light"
      color="gray"
      size="xl"
      radius="xl"
    >
      {colorScheme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </ActionIcon>
  );
};
