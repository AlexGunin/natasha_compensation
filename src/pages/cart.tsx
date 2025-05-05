import {getAddedSum, useCartProvider} from "../cart-context.tsx";
import {Stack, Title, Text, Button, Grid, Space} from "@mantine/core";
import {Fragment, useMemo} from "react";
import {useRouter} from "@tanstack/react-router";
import {AMOUNT_MONEY} from "../constants.ts";

interface RowProps {
    left: string
    right: string
}

const Row = (props: RowProps) => {
    return <Fragment>
        <Grid.Col span={8}>
            <Text size="xl">{props.left}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
            <Text size="xl" ta="right">{props.right}</Text>
        </Grid.Col>
    </Fragment>
}

export default function CartPage() {
    const {catalog} = useCartProvider()
    const router = useRouter()

    const activeCart = useMemo(() => {
        return catalog.filter(item => item.isAdded)
    }, [catalog])

    return <Stack gap="xl">
        <Title order={1} style={{textAlign:'center'}}>Корзина</Title>
        <Stack>
            <Grid>
                {activeCart.map(item => {
                    return <Row key={item.id} left={item.title} right={`${item.price}р.`}/>
                })}
            </Grid>
            <Space h="xl" />
            <Grid>
                <Row key="total" left="Итого" right={`${getAddedSum(activeCart)}р.`}></Row>
                <Row key="limit" left="Мой лимит" right={`${AMOUNT_MONEY}р.`}></Row>
            </Grid>
        </Stack>

        <Button onClick={() => router.navigate({to: '/finish'})} style={{width: 250, margin: "0 auto"}}>
            Оформить
        </Button>
    </Stack>
}
