import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { BenefitId, BenefitInOrder, BenefitItem } from "../types/benefits.ts";
import { useGetLimit } from "../hooks/use-get-limit.ts";

type Cart = Record<BenefitId, BenefitInOrder>;

interface ICartContext {
  cart: Cart;
  added: Set<BenefitId>;
  list: BenefitInOrder[];
  add: (item: BenefitItem) => void;
  remove: (item: BenefitItem) => void;
  getQuantity: (id: BenefitId) => number;
  checkCanAdd: (
    item: BenefitItem,
  ) => { value: true } | { value: false; reason: string };
  limit: number;
  total: number;
}

const CartContext = createContext<ICartContext | null>(null);

const DEFAULT_CART: Cart = {};

export const CartProvider = (props: PropsWithChildren) => {
  const limit = useGetLimit();
  
  const [cart, setCart] = useLocalStorage({
    key: "cart-v2",
    defaultValue: DEFAULT_CART,
  });

  const { added, list, total } = useMemo(() => {
    const list = Object.values(cart);

    return {
      added: new Set(Object.keys(cart).map(Number)),
      list,
      total: list.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0),
    };
  }, [cart]);

  const checkCanAdd: ICartContext["checkCanAdd"] = (item) => {
    const benefitInCart = cart[item.id];

    if (!benefitInCart) {
      return limit >= total + item.price
        ? { value: true }
        : { value: false, reason: "Недостаточно средств" };
    }

    if (item.max_usage !== null && benefitInCart.quantity >= item.max_usage) {
      return { value: false, reason: "Выбрано максимальное количество льгот" };
    }

    return limit >= total + benefitInCart.price
      ? { value: true }
      : { value: false, reason: "Недостаточно средств" };
  };

  const add: ICartContext["add"] = (item) => {
    if (!checkCanAdd(item).value) {
      return;
    }

    setCart((prev) => {
      const newObj = structuredClone(prev);
      const currentBenefit = prev[item.id];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { max_usage, ...toCopy } = item;

      const obj = {
        ...toCopy,
        quantity: currentBenefit ? currentBenefit.quantity + 1 : 1,
      };

      newObj[item.id] = obj;

      return newObj;
    });
  };

  const remove: ICartContext["add"] = (item) => {
    setCart((prev) => {
      const currentBenefit = prev[item.id];

      if (!currentBenefit) {
        return prev;
      }

      const newObj = structuredClone(prev);

      if (currentBenefit.quantity === 1) {
        delete newObj[item.id];

        return newObj;
      }

      newObj[item.id].quantity = currentBenefit.quantity - 1;

      return newObj;
    });
  };

  const getQuantity: ICartContext["getQuantity"] = (id) =>
    cart[id]?.quantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        add,
        remove,
        added,
        list,
        getQuantity,
        checkCanAdd,
        limit,
        total,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("You should use hook useCartProvider inside CartProvider ");
  }

  return context;
};
