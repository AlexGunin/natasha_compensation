import {
  Button,
  Checkbox,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { BenefitItem, BenefitScope } from "../../types/benefits";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { BENEFITS_QUERY_KEY } from "../../queries/benefits-query";

const SELECT_SCOPE_DATA = [
  { value: BenefitScope.SELF, label: "Личная" },
  { value: BenefitScope.FAMILY, label: "Семейная" },
];

interface CreateCatalogFormProps {
  item?: BenefitItem;
  onSubmit?: VoidFunction;
}

const checkIsEdit = (item?: BenefitItem): item is BenefitItem => !!item;

export const BenefitForm = (props: CreateCatalogFormProps) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const isEdit = checkIsEdit(props.item);

  const form = useForm({
    initialValues: {
      name: props.item?.name ?? "",
      description: props.item?.description ?? "",
      price: props.item?.price ?? 0,
      hasMaxUsage: props.item ? props.item.max_usage !== null : false,
      max_usage: props.item?.max_usage ?? 1,
      scope: props.item?.scope ?? BenefitScope.SELF,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Слишком короткое название"),
      price: (value) =>
        value >= 0 ? null : "Цена не может быть отрицательной",
      max_usage: (value, otherValues) => {
        if (!otherValues.hasMaxUsage) {
          return null;
        }
        return value >= 0 ? null : "Количество не может быть отрицательным";
      },
    },
    transformValues: (values) => ({
      ...values,
      price: Number(values.price),
    }),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const { hasMaxUsage, ...other } = values;

      const dto = { ...other, max_usage: hasMaxUsage ? other.max_usage : null };

      if (isEdit && props.item) {
        await api.benefits.edit(props.item.id, dto);
      } else {
        await api.benefits.create(dto);
      }

      queryClient.invalidateQueries({ queryKey: [BENEFITS_QUERY_KEY] });

      toast(`Форма успешно отправлена. Изменения применены`, {
        type: "success",
      });

      props.onSubmit?.();
    } catch (error) {
      toast(`Ошибка при ${isEdit ? "редактировании" : "создании"}: ${error}`, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <TextInput
        label="Название"
        placeholder="Введите название льготы"
        size="md"
        {...form.getInputProps("name")}
        withAsterisk
      />
      <Textarea
        label="Описание"
        size="md"
        placeholder="Введите описание льготы"
        rows={5}
        {...form.getInputProps("description")}
      />
      <NumberInput
        size="md"
        label="Стоимость"
        placeholder="0"
        {...form.getInputProps("price")}
        withAsterisk
      />
      <Checkbox
        size="md"
        label="Ограничивать количество выбранных льгот?"
        {...form.getInputProps("hasMaxUsage")}
        checked={form.values.hasMaxUsage}
      />
      {form.values.hasMaxUsage && (
        <NumberInput
          size="md"
          label="Максимальное количество льгот"
          placeholder="1"
          {...form.getInputProps("max_usage")}
        />
      )}

      <Select
        size="md"
        label="Для кого предназначена льгота"
        placeholder="Pick value"
        data={SELECT_SCOPE_DATA}
        {...form.getInputProps("scope")}
        withAsterisk
      />
      <Button
        size="md"
        type="submit"
        fullWidth
        variant="light"
        loading={loading}
        disabled={loading}
      >
        Сохранить
      </Button>
    </form>
  );
};
