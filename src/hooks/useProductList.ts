import { useContext } from "react";
import { ProductListContext, ProductListContextType } from "../context/ProductListContext";


const useProductList = () => {
  const context = useContext<ProductListContextType | undefined>(ProductListContext);
  
  if (!context) {
    throw new Error("useProductList must be used within a ProductListContextProvider");
  }

  const { cartState, cartDispatch, sortFilterState, sortFilterDispatch } = context;

  return { cartState, cartDispatch, sortFilterState, sortFilterDispatch };
};

export default useProductList;
