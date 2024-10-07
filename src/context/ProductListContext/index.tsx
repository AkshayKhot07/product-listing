import { createContext, Dispatch, useEffect, useReducer } from "react";
import {
  productListingDummyData,
} from "../../constants/data";
import {
  CartAction,
  cartReducer,
  CartState,
  SortFilterAction,
  sortFilterReducer,
  SortFilterState,
} from "../ProductListReducer";

export interface ProductListContextType {
  cartState: CartState;
  cartDispatch: Dispatch<CartAction>;
  sortFilterState: SortFilterState;
  sortFilterDispatch: Dispatch<SortFilterAction>;
}

const ProductListContext = createContext<ProductListContextType | undefined>(
  undefined
);

// Local Storage Functions
const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const ProductListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialCartState = getLocalStorage("cartState") || {
    products: productListingDummyData,
    cart: [],
  };

  const initialSortFilterState = getLocalStorage("sortFilterState") || {
    bySort: {
      key: "",
      order: "",
    },
    searchQuery: "",
    byType: "",
    bySize: "",
  };

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [sortFilterState, sortFilterDispatch] = useReducer(sortFilterReducer, initialSortFilterState);

  // Effect to persist cartState to localStorage
  useEffect(() => {
    setLocalStorage("cartState", cartState);
  }, [cartState]);

  // Effect to persist sortFilterState to localStorage
  useEffect(() => {
    setLocalStorage("sortFilterState", sortFilterState);
  }, [sortFilterState]);

  return (
    <ProductListContext.Provider
      value={{ cartState, cartDispatch, sortFilterState, sortFilterDispatch }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

export { ProductListContext, ProductListContextProvider };
