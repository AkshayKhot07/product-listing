import { productListingDummyDataTypes } from "../../constants/data";

export interface CartState {
  products: productListingDummyDataTypes[];
  cart: productListingDummyDataTypes[];
}

export interface SortFilterState {
  bySort: {
    key: string;
    order: string;
  };
  searchQuery: string;
  byType: string;
  bySize: string;
}

// Define types for action
export type CartAction =
  | { type: "ADD_TO_CART"; payload: productListingDummyDataTypes }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "CHANGE_CART_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR_CART" };

export type SortFilterAction =
  | { type: "SORT_BY"; payload: { key: string; order: string } }
  | { type: "FILTER_BY_SEARCH"; payload: string }
  | { type: "FILTER_BY_TYPE"; payload: string }
  | { type: "FILTER_BY_SIZE"; payload: string }
  | { type: "CLEAR_FILTERS" };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const sortFilterReducer = (
  state: SortFilterState,
  action: SortFilterAction
): SortFilterState => {
  switch (action.type) {
    case "SORT_BY":
      return { ...state, bySort: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "FILTER_BY_TYPE":
      return { ...state, byType: action.payload };
    case "FILTER_BY_SIZE":
      return { ...state, bySize: action.payload };
    case "CLEAR_FILTERS":
      return {
        bySort: {
          key: "",
          order: "",
        },
        searchQuery: "",
        byType: "",
        bySize: "",
      };
    default:
      return state;
  }
};
