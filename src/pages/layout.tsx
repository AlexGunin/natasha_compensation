import {Outlet} from '@tanstack/react-router';
import {Flex, Progress, Stack, Title} from "@mantine/core";
import {AMOUNT_MONEY} from "../constants.ts";
import {getAddedSum, useCartProvider} from "../cart-context.tsx";
import {NavLink} from "../components/nav-link.tsx";

export const Layout = () => {
    const {catalog} = useCartProvider()

    const addedSum = getAddedSum(catalog)

    return (
        <Stack gap="md" align="center" style={{width: '100%'}}>
            <div style={{width: '100%', height: '100%'}}>
                <Outlet />
            </div>
            <Stack gap="md" justify="center" style={{padding: '1rem', background: 'rgba(255,255,255,0.95)', width: 'calc(100% + 2rem)', position: 'sticky', bottom: 0}}>
                <Stack style={{marginTop: 'auto', position: 'sticky', bottom: 20}}>
                    <Progress value={addedSum * 100 / AMOUNT_MONEY} size="lg" transitionDuration={200} />
                    <Title order={4} ta="center">{addedSum} / {AMOUNT_MONEY}</Title>
                </Stack>

                <Flex gap="md" justify="center">
                    <NavLink to="/">Каталог</NavLink>
                    <NavLink to="/cart">Корзина</NavLink>
                </Flex>
            </Stack>
        </Stack>
    );
};
