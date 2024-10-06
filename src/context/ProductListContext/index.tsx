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

const ProductListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    products: productListingDummyData,
    cart: [],
  });

  const [sortFilterState, sortFilterDispatch] = useReducer(sortFilterReducer, {
    bySort: {
      key: "",
      order: "",
    },
    //Filter Comp
    searchQuery: "",
    byType: "",
    bySize: "",
  });

  // const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const sortBy = searchParams.get("sortBy");
  //   const sortOrder = searchParams.get("sortOrder");

  //   if (sortBy && sortOrder) {
  //     cartDispatch({
  //       type: "SORT_PRODUCTS",
  //       payload: { sortBy, sortOrder },
  //     });
  //   }
  // }, [searchParams]);

  return (
    <ProductListContext.Provider
      value={{ cartState, cartDispatch, sortFilterState, sortFilterDispatch }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

export { ProductListContext, ProductListContextProvider };
