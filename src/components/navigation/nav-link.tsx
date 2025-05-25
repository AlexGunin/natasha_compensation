import { Badge } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useActiveRoute } from "../../hooks/use-active-route";

interface NavLinkProps extends PropsWithChildren {
  to: string;
}

export const NavLink = (props: NavLinkProps) => {
  const activeRoute = useActiveRoute();

  const isActive =props.to === activeRoute;
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
