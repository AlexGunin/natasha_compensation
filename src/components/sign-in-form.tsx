import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { MouseEvent, useRef, useState } from "react";
import { authService } from "../services/auth-service";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const isAnonymous = useRef(false);
  const { navigate } = useRouter();
  const form = useForm({
    initialValues: {
      nickname: "",
      password: "",
    },
    validate: {
      nickname: (value) =>
        value.length > 0 || isAnonymous.current ? null : "Введите ваш никнейм",
      password: (value) =>
        value.length > 0 || isAnonymous.current
          ? null
          : "Пароль не может быть пустым",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      if (isAnonymous.current) {
        await authService.signInAnonym();
      } else {
        await authService.signIn(values);
      }
      navigate({ to: "/" });
    } catch (error: unknown) {
      toast(`Ошибка при входе: ${error}`, { type: "error" });
    } finally {
      setLoading(false);
      isAnonymous.current = false;
    }
  };

  const handleAnonymousLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isAnonymous.current = true;
    form.reset();

    await handleSubmit(form.values);
    isAnonymous.current = false;
  };

  return (
    <Stack p={0} m="0 auto" justify="center" gap="xl" h="100%" maw={800}>
      <Title ta="center">Вход в аккаунт</Title>
      <Text color="dimmed" size="sm" ta="center">
        Нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link>
      </Text>

      <Paper withBorder p="xl" radius="md">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <TextInput
            label="Никнейм"
            placeholder="Введите ваш никнейм"
            size="lg"
            {...form.getInputProps("nickname")}
            withAsterisk
          />

          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            size="lg"
            {...form.getInputProps("password")}
            withAsterisk
          />

          <Flex gap="md" wrap="wrap">
            <Button
              type="submit"
              size="lg"
              variant="light"
              fullWidth
              loading={loading}
              disabled={loading}
              miw={250}
              flex={1}
              onClick={handleAnonymousLogin}
            >
              Войти как аноним
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="light"
              fullWidth
              loading={loading}
              disabled={loading}
              miw={250}
              flex={1}
            >
              Войти
            </Button>
          </Flex>
        </form>
      </Paper>
    </Stack>
  );
};
