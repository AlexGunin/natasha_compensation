import { PropsWithChildren } from "react";

export const CatalogGrid = (props: PropsWithChildren) => {
  return (
    <div
      data-onboarding="catalog-grid"
      style={{
        display: "grid",
        gap: 48,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};
