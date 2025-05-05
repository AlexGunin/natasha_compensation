import {Badge, Button, Card, Group, Text} from "@mantine/core"

export interface ICatalogItem {
    id: number,
    title: string
    description?: string;
    price: number
    isAdded: boolean
}

export interface CatalogItemProps extends ICatalogItem {
    isDisabled: boolean
    onClick: (item: ICatalogItem) => void
}

export const CatalogItem = (props: CatalogItemProps) => {
    return <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{props.title}</Text>
            <Badge color="pink">{props.price}</Badge>
        </Group>

        {props.description ?         <Text size="sm" c="dimmed">
            {props.description}
        </Text> : null}

        {props.isAdded ?   <Button color="red" fullWidth mt="md" radius="md" disabled={props.isDisabled} onClick={() => props.onClick(props)}>
            Удалить
        </Button>:      <Button color="blue" fullWidth mt="md" radius="md" disabled={props.isDisabled} onClick={() => props.onClick(props)}>
            Добавить
        </Button>      }

    </Card>
}
