import { useEffect, useState } from "react";
import useProductList from "../../hooks/useProductList";
import SummaryProductList from "./SummaryProductList";
import { Link } from "react-router-dom";

const SummaryComponent = () => {
  const { cartState, cartDispatch, sortFilterDispatch } = useProductList();
  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    setSubTotal(
      cartState.cart.reduce(
        (acc, curr) => acc + Number(curr.price) * Number(curr.qty),
        0
      )
    );
  }, [cartState]);

  return (
    <div className="flex gap-3 py-4 flex-col md:flex-row">
      <div className="flex-[2]">
        <SummaryProductList />
      </div>
      <div className="flex-1 border border-gray-500 p-2 flex flex-col gap-2 h-[150px]">
        <p className="text-gray-500 font-semibold text-lg">Cart Totals</p>
        {subTotal > 0 ? (
          <>
            <p className="flex gap-2 justify-between pt-2 mt-2 border-t-2 border-gray-500">
              <span className="font-bold text-gray-700">Total</span>
              <span className="text-blue-700 font-bold">
                ${subTotal?.toFixed(2)}
              </span>
            </p>
            <div>
              <Link to={"/thankyou"} className="w-full block">
                <button
                  type="button"
                  className="bg-blue-700 w-full py-2 px-4 rounded-3xl text-white font-bold"
                  onClick={() => {
                    cartDispatch({
                      type: "CLEAR_CART",
                    });
                    sortFilterDispatch({
                      type:"CLEAR_FILTERS"
                    })
                  }}
                >
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="font-bold text-gray-700">No Items Added</p>
        )}
      </div>
    </div>
  );
};

export default SummaryComponent;
