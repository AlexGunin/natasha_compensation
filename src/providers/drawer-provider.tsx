import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Drawer, DrawerProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type IDrawerProps = Omit<DrawerProps, "opened" | "onClose">;

interface IDrawerContext {
  open: (props: IDrawerProps) => void;
  close: VoidFunction;
}

const DrawerContext = createContext<IDrawerContext | null>(null);

const drawerStyles = {
  inner: {
    left: 0,
  },
} as const;

export const DrawerProvider = (props: PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerProps, setDrawerProps] = useState<IDrawerProps | null>(null);

  const value = useMemo<IDrawerContext>(
    () => ({
      open: (props) => {
        setDrawerProps(props);
        open();
      },
      close: () => {
        setDrawerProps(null);
        close();
      },
    }),
    [],
  );

  return (
    <DrawerContext.Provider value={value}>
      <Drawer
        opened={opened}
        onClose={value.close}
        position="left"
        styles={drawerStyles}
        {...drawerProps}
      />
      {props.children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(
      "You should use hook useDrawerProvider inside DrawerProvider ",
    );
  }

  return context;
};
