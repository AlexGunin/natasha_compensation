import { useContextMenu } from "mantine-contextmenu";
import { useUserContext } from "../../../providers/user-provider";
import { UserRole } from "../../../types/users";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDrawerContext } from "../../../providers/drawer-provider";
import { useCatalogContext } from "../../../providers/catalog-provider";
import { useQueryClient } from "@tanstack/react-query";
import { BenefitForm } from "../benefit-form";
import { BenefitItem } from "../../../types/benefits";
import { api } from "../../../api/api";
import { BENEFITS_QUERY_KEY } from "../../../queries/benefits-query";
import { ToastUndo } from "../../shared/toast-undo";

export const useCardContextMenu = (item: BenefitItem) => {
  const user = useUserContext();

  const { showContextMenu } = useContextMenu();

  const { open, close } = useDrawerContext();

  const { markToDelete, unmarkToDelete } = useCatalogContext();

  const queryClient = useQueryClient();

  return user?.role === UserRole.ADMIN
    ? showContextMenu([
        {
          key: "edit",
          icon: <SquarePen size={14} />,
          title: "Редактировать",
          onClick: () =>
            open({
              children: <BenefitForm item={item} onSubmit={close} />,
              title: `Редактирование льготы «${item.name}»`,
            }),
        },
        {
          key: "delete",
          icon: <Trash2 size={14} />,
          title: "Удалить",
          onClick: () => {
            markToDelete(item.id);

            toast.warning(ToastUndo, {
              onClose: async (removedByUser) => {
                if (removedByUser) return;

                await api.benefits.delete(item.id);
                queryClient.invalidateQueries({
                  queryKey: [BENEFITS_QUERY_KEY],
                });
                unmarkToDelete(item.id);
              },
              closeButton: false,
              autoClose: 3000,
              pauseOnHover: false,
              data: {
                onUndo: () => unmarkToDelete(item.id),
              },
            });
          },
        },
      ])
    : undefined;
};
