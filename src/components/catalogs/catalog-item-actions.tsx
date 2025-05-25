import { ActionIcon, Menu } from "@mantine/core";
import { Settings, Trash2, SquarePen } from "lucide-react";
import { useDrawerContext } from "../../providers/drawer-provider";
import { BenefitForm } from "./benefit-form";
import { BenefitItem } from "../../types/benefits";
import { toast } from "react-toastify";
import { ToastUndo } from "../shared/toast-undo";
import { useCatalogContext } from "../../providers/catalog-provider";
import { api } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { BENEFITS_QUERY_KEY } from "../../queries/benefits-query";

interface CatalogItemActionsProps {
  item: BenefitItem;
  close?: VoidFunction;
}

export const CatalogItemActions = (props: CatalogItemActionsProps) => {
  const { open, close } = useDrawerContext();

  const { markToDelete, unmarkToDelete } = useCatalogContext();

  const queryClient = useQueryClient();

  return (
    <Menu shadow="md" width={200} opened={true}>
      {/* <Menu.Target> */}
      {/* <ActionIcon variant="transparent" color="gray"> */}
      {/* <Settings /> */}
      {/* </ActionIcon> */}
      {/* </Menu.Target> */}

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<SquarePen size={14} />}
          onClick={() =>
            open({
              children: <BenefitForm item={props.item} onSubmit={close} />,
              title: `Редактирование льготы «${props.item.name}»`,
            })
          }
        >
          Редактировать
        </Menu.Item>
        <Menu.Item
          leftSection={<Trash2 size={14} />}
          onClick={() => {
            markToDelete(props.item.id);

            toast.warning(ToastUndo, {
              onClose: async (removedByUser) => {
                if (removedByUser) return;

                await api.benefits.delete(props.item.id);
                queryClient.invalidateQueries({
                  queryKey: [BENEFITS_QUERY_KEY],
                });
                unmarkToDelete(props.item.id);
              },
              closeButton: false,
              autoClose: 3000,
              pauseOnHover: false,
              data: {
                onUndo: () => unmarkToDelete(props.item.id),
              },
            });
          }}
        >
          Удалить
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
