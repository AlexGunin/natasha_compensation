import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Слишком короткое имя"),
      nickname: (value) => (value.length > 0 ? null : "Слишком короткое имя"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Пароли не совпадают",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      console.log("Регистрация:", values);
      // Здесь можно вызвать API для регистрации
    } catch (error) {
      console.error("Ошибка при регистрации", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack p={0} m="0 auto" justify="center" gap="xl" h="100%" maw={800}>
      <Title ta="center">Регистрация</Title>
      <Text color="dimmed" size="sm" ta="center">
        Уже есть аккаунт? <Link to="/sign-in">Войти</Link>
      </Text>

      <Paper withBorder p="xl" radius="md">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <TextInput
            label="Имя"
            placeholder="Введите свое имя"
            {...form.getInputProps("name")}
            size="lg"
            withAsterisk
          />

          <TextInput
            label="Никнейм"
            placeholder="Используется для входа"
            {...form.getInputProps("name")}
            size="lg"
            withAsterisk
          />

          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            {...form.getInputProps("password")}
            size="lg"
            withAsterisk
          />

          <PasswordInput
            label="Подтвердите пароль"
            placeholder="Повторите пароль"
            {...form.getInputProps("confirmPassword")}
            size="lg"
            withAsterisk
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            variant="light"
            loading={loading}
            disabled={loading}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Stack>
  );
};
