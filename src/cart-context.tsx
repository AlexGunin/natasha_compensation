import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext} from "react";
import {ICatalogItem} from "./components/catalog-item.tsx";
import {useLocalStorage} from "@mantine/hooks";

const CATALOG_ITEMS: ICatalogItem[] = [
    {id: 1,title: 'Спорт', price: 5000, isAdded: false},
    {id: 2,title: 'Обучение', price: 2000, isAdded: false},
    {id: 3,title: 'Питание', price: 1500, isAdded: false},
    {id: 4,title: 'Такси', price: 2500, isAdded: false},
]

interface ICartContext {
    catalog: ICatalogItem[]
    setCatalog: Dispatch<SetStateAction<ICatalogItem[]>>
}

const CartContext = createContext<ICartContext>({catalog: CATALOG_ITEMS, setCatalog: () => CATALOG_ITEMS})


export const CartProvider = (props: PropsWithChildren) => {
    const [catalog, setCatalog] = useLocalStorage({
        key: 'cart',
        defaultValue: CATALOG_ITEMS,
    });

    return <CartContext.Provider value={{catalog, setCatalog}}>{props.children}</CartContext.Provider>
}

export const useCartProvider = () => {
   return useContext(CartContext)
}

export const getAddedSum = (cart: ICatalogItem[]) => {
    return cart.reduce((acc, cur) => {

        if(!cur.isAdded) {
            return acc
        }

        return acc + cur.price
    }, 0)
}
