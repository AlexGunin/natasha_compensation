import {Badge} from "@mantine/core";
import {Link, useMatch, useRouter} from "@tanstack/react-router";
import {PropsWithChildren} from "react";

interface NavLinkProps extends PropsWithChildren{
    to: string
}

export const NavLink = (props: NavLinkProps) => {
    const match = useMatch({ to: props.to, fuzzy: false });
    const { state } = useRouter();
    const isActive = state.location.pathname === props.to
    return <Link
        to={props.to}
    >
        <Badge
            size="xl"
            color={isActive ? 'blue' :'gray' }
        >
            {props.children}
        </Badge>
    </Link>
}
