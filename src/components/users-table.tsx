import { ActionIcon, MultiSelect, TextInput } from "@mantine/core";
import { Search, X } from "lucide-react";
import { DataTable } from "mantine-datatable";
import { useMemo, useState } from "react";
import { USER_ROLE_STR } from "../constants/user";
import { User, UserRole } from "../types/users";

interface UsersTableProps {
  items: User[];
}

type UserFieldsName = Extract<keyof User, "name" | "nickname" | "role">;

interface UserFilterValue extends Record<UserFieldsName, unknown> {
  name: string;
  nickname: string;
  role: UserRole[];
}

type UserFilterCheckers = {
  [Key in UserFieldsName]: (
    user: User,
    filterValue: UserFilterValue[Key],
  ) => boolean;
};

const userFilterCheckers = {
  name: (user, filterValue) =>
    filterValue
      ? user.name.toLowerCase().includes(filterValue.toLowerCase())
      : true,
  nickname: (user, filterValue) =>
    filterValue
      ? user.nickname.toLowerCase().includes(filterValue.toLowerCase())
      : true,
  role: (user, filterValue) =>
    filterValue.length > 0
      ? filterValue.includes(user.role.toLowerCase() as UserRole)
      : true,
} satisfies UserFilterCheckers;

const roles = [
  {
    label: USER_ROLE_STR[UserRole.ADMIN],
    value: UserRole.ADMIN,
  },
  {
    label: USER_ROLE_STR[UserRole.USER],
    value: UserRole.USER,
  },
];

export const UsersTable = (props: UsersTableProps) => {
  const [filters, setFilters] = useState<UserFilterValue>({
    name: "",
    nickname: "",
    role: [] as UserRole[],
  });

  const filteredUsers = useMemo(() => {
    return props.items.filter((item) => {
      return Object.keys(filters)
        .map((filterKey) => {
          const key = filterKey as UserFieldsName;
          // @ts-expect-error: Todo
          return userFilterCheckers[key](item, filters[key]);
        })
        .every(Boolean);
    });
  }, [props.items, filters]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={filteredUsers}
      columns={[
        {
          accessor: "id",
          render: (user) => user.id,
        },
        {
          accessor: "name",
          render: (user) => user.name,
          filter: (
            <TextInput
              label="Имя"
              placeholder="Поиск"
              leftSection={<Search size={16} />}
              rightSection={
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => setFilters((prev) => ({ ...prev, name: "" }))}
                >
                  <X size={14} />
                </ActionIcon>
              }
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.currentTarget.value }))
              }
            />
          ),
          filtering: filters.name !== "",
        },
        {
          accessor: "nickname",
          render: (user) => user.nickname,
          filter: (
            <TextInput
              label="Nickname"
              placeholder="Поиск"
              leftSection={<Search size={16} />}
              rightSection={
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, nickname: "" }))
                  }
                >
                  <X size={14} />
                </ActionIcon>
              }
              value={filters.nickname}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  nickname: e.currentTarget.value,
                }))
              }
            />
          ),
          filtering: filters.name !== "",
        },
        {
          accessor: "role",
          render: (user) => USER_ROLE_STR[user.role],
          filter: (
            <MultiSelect
              label="Роль"
              data={roles}
              value={filters.role}
              placeholder="Поиск"
              onChange={(data) => {
                setFilters((prev) => ({ ...prev, role: data as UserRole[] }));
              }}
              leftSection={<Search size={16} />}
              comboboxProps={{ withinPortal: false }}
              clearable
              searchable
            />
          ),
          filtering: filters.role.length > 0,
        },
      ]}
    />
  );
};
