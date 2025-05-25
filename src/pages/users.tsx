import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { User } from "../types/users";
import { QueryTemplate } from "../components/shared/query-template";
import { Skeleton, Stack } from "@mantine/core";
import { UsersTable } from "../components/users-table";

const DEFAULT_USERS_LIST: User[] = [];

const Error = () => {
  return <div>Error</div>;
};

export default function UsersPage() {
  const { data = DEFAULT_USERS_LIST, status } = useQuery({
    queryKey: ["users"],
    queryFn: api.users.getAll,
  });

  return (
    <QueryTemplate
      status={status}
      error={<Error />}
      pending={
        <Stack gap="lg" pt="1rem">
          <Skeleton height={40} radius="md" mb="1rem" />
        </Stack>
      }
      success={<UsersTable items={data} />}
    />
  );
}
