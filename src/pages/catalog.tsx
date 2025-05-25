import { useCatalogContext } from "../providers/catalog-provider.tsx";
import { Skeleton, Stack } from "@mantine/core";
import { CatalogGrid } from "../components/catalogs/catalog-grid.tsx";
import { CatalogList } from "../components/catalogs/catalog-list.tsx";
import { QueryTemplate } from "../components/shared/query-template.tsx";

const Error = () => {
  return <div>Произошла ошибка, попробуйте снова</div>;
};
const SKELETON_COUNT = 8;
const SKELETON_ARRAY = Array(SKELETON_COUNT)
  .fill(null)
  .map((_, index) => index);

export default function CatalogPage() {
  const { status } = useCatalogContext();

  return (
    <QueryTemplate
      status={status}
      error={<Error />}
      pending={
        <Stack gap="lg" pt="1rem">
          <Skeleton height={40} radius="md" mb="1rem" />
          <CatalogGrid>
            {SKELETON_ARRAY.map((id) => (
              <Skeleton key={id} height={250} radius="md" />
            ))}
          </CatalogGrid>
        </Stack>
      }
      success={<CatalogList />}
    />
  );
}
