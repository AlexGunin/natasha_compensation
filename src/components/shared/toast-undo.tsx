import { ActionIcon, Flex, Text } from "@mantine/core";
import { Undo2 } from "lucide-react";
import { ToastContentProps } from "react-toastify";

type UndoNotificationData = {
  onUndo: () => void;
  title?: string;
};

export const ToastUndo = (props: ToastContentProps<UndoNotificationData>) => {
  const handleUndo = () => {
    props.data.onUndo();
    props.closeToast(true);
  };

  return (
    <Flex align="center" gap="md" justify="space-between" flex={1}>
      <Text>{props.data.title ?? "Элемент будет удален"}</Text>
      <ActionIcon size="xl" variant="light" color="gray" onClick={handleUndo}>
        <Undo2 size={24} />
      </ActionIcon>
    </Flex>
  );
};
