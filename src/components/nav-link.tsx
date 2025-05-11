import { Badge } from "@mantine/core";
import { Link, useMatch, useRouter } from "@tanstack/react-router";
import { PropsWithChildren } from "react";

interface NavLinkProps extends PropsWithChildren {
  to: string;
}

export const NavLink = (props: NavLinkProps) => {
  // @ts-expect-error: Todo
  const match = useMatch({ to: props.to, fuzzy: false });
  const { state } = useRouter();

  const isActive =
    state.location.pathname === `/natasha_compensation${props.to}`;
  return (
    <Link to={props.to}>
      <Badge
        size="xl"
        color={isActive ? "blue" : "gray"}
        radius="md"
        variant="light"
        styles={{ root: { height: 42, minWidth: 120 } }}
      >
        {props.children}
      </Badge>
    </Link>
  );
};
