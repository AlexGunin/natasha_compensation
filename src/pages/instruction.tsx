// import { Stack, Title, Text, List, ThemeIcon } from "@mantine/core";
import { Card, Title, Text, List, ThemeIcon, Group, Button } from '@mantine/core';
import { List as IconList } from "lucide-react"
import { CoolInstruction } from '../components/instruction-steps';

// const INSTRUCTION_STEPS = [
//   "В каталоге льгот выберте те льготы, которые для вас наиболее актуальны.",
//   "После выбора интересующих вас льгот, проверьте заказ в корзине.",
//   "Завершите оформление вашего индивидуального пакета льгот",
// ] as const;

// export default function InstructionPage() {
//   return (
//     <Stack gap="xl">
//       <Title order={2} ta="center">
//         Добро пожаловать в систему гибкого управления льготами!
//       </Title>
//       <Title order={4} ta="center">
//         Здесь вы можете выбрать наиболее привлекательные для вас льготы. Также
//         есть опция оформления льгот для ваших близких (дети, родители, супруги).
//       </Title>
//       <Text size="md">Следуйте нижеописанным шагам:</Text>

//       <List spacing="xl" size="xl" center>
//         {INSTRUCTION_STEPS.map((step, index) => (
//           <List.Item
//             key={index}
//             icon={
//               <ThemeIcon color="var(--app-highlight-gradient)" radius="xl">
//                 {index + 1}
//               </ThemeIcon>
//             }
//           >
//             {step}
//           </List.Item>
//         ))}
//       </List>
//     </Stack>
//   );
// }


// export default function BenefitsInstructions() {
//   return (
//     <Card shadow="md" p="xl" radius="lg" withBorder bg="dark.8" maw={420} mx="auto">
//       <Title order={2} ta="center" mb="md" c="white">
//         Добро пожаловать!
//       </Title>
//       <Text ta="center" mb="lg" c="gray.2">
//         Здесь вы можете выбрать и оформить льготы для себя и своих близких.
//       </Text>
//       <List
//         spacing="md"
//         size="md"
//         center
//         icon={
//           <ThemeIcon radius="xl" size={32} variant="light" color="blue">
//             <IconList size={18} />
//           </ThemeIcon>
//         }
//         mb="md"
//       >
//         <List.Item
//           icon={
//             <ThemeIcon radius="xl" size={32} variant="filled" color="blue">
//               1
//             </ThemeIcon>
//           }
//         >
//           Перейдите в&nbsp;<b>каталог</b> и выберите нужные льготы
//         </List.Item>
//         <List.Item
//           icon={
//             <ThemeIcon radius="xl" size={32} variant="filled" color="teal">
//               2
//             </ThemeIcon>
//           }
//         >
//           Проверьте выбранные льготы в&nbsp;<b>корзине</b>
//         </List.Item>
//         <List.Item
//           icon={
//             <ThemeIcon radius="xl" size={32} variant="filled" color="lime">
//               3
//             </ThemeIcon>
//           }
//         >
//           Оформите свой индивидуальный пакет одним кликом
//         </List.Item>
//       </List>
//       <Group justify="center" mt="md">
//         <Button variant="outline" color="blue" size="md">
//           Перейти к каталогу
//         </Button>
//       </Group>
//     </Card>
//   );
// }