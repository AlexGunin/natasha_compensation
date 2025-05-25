import { PropsWithChildren } from "react";
import { useUserContext } from "../../providers/user-provider";

export const IfUser = (props: PropsWithChildren) => {
  const user = useUserContext();

  if (!user) {
    return null;
  }

  return props.children;
};
