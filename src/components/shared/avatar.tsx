import { Avatar as MantineAvatar } from "@mantine/core";

interface AvatarProps {
  nickname: string;
}

const style = {
  cursor: "pointer",
};

export const Avatar = (props: AvatarProps) => {
  return props.nickname === "anonym" ? (
    <MantineAvatar radius="xl" style={style} />
  ) : (
    <MantineAvatar color="gray" radius="xl" size="md" style={style}>
      {props.nickname.slice(0, 2).toUpperCase()}
    </MantineAvatar>
  );
};
