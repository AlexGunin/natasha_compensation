import {Stack, Title} from "@mantine/core";
import {CatalogItem} from "../components/catalog-item.tsx";
import {getAddedSum, useCartProvider} from "../cart-context.tsx";
import {AMOUNT_MONEY} from "../constants.ts";

export default function CatalogPage() {
    const {catalog, setCatalog} = useCartProvider()

    const addedSum = getAddedSum(catalog)

    return <Stack gap="md">
        <Title order={1} ta="center">Каталог льгот</Title>

        <div style={{
            display:'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            width: '100%'
        }}>
            {catalog.map(item => <CatalogItem isDisabled={item.isAdded ? false : addedSum + item.price > AMOUNT_MONEY} {...item} key={item.id} onClick={(clickedItem) => {
                setCatalog(prev => {
                    return prev.map(item => {
                        if(item.id === clickedItem.id) {
                            return {...item, isAdded: !item.isAdded}
                        }

                        return item
                    })
                })
            }}/>)}
        </div>
    </Stack>
}
