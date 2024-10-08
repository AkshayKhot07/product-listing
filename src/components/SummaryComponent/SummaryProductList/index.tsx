import { RxReset } from "react-icons/rx";
import { productListingDummyDataTypes } from "../../../constants/data";
import useProductList from "../../../hooks/useProductList";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const SummaryProductList = () => {
  const { cartState } = useProductList();

  return (
    <div className="summary-container">
      <ul className="list-none flex gap-2 pb-3 mb-2 border-b-2 border-gray-200 text-sm text-gray-700 font-bold">
        <li className="flex-[2]">Product</li>
        <li className="flex-1">Price</li>
        <li className="flex-1">Quantity</li>
        <li className="flex-1">SubTotal</li>
      </ul>

      {cartState?.cart?.length === 0 && (
        <div className="flex gap-3 items-center">
          <p className="font-bold text-gray-700">No Items Added</p>
          <Link to={"/"}>
            <div className="flex gap-2">
              <RxReset
                style={{
                  color: "#318CE7",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              />
              <p className="text-[#318CE7] font-bold text-sm">
                Go Back To Homepage
              </p>
            </div>
          </Link>
        </div>
      )}

      {cartState?.cart?.map((item) => {
        return <SummaryProductCard item={item} />;
      })}
    </div>
  );
};

export default SummaryProductList;

const SummaryProductCard = ({
  item,
}: {
  item: productListingDummyDataTypes;
}) => {
  const { cartDispatch } = useProductList();

  const changeProductQty = ({ id, qty }: { id: string; qty: number }) =>
    cartDispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: id,
        qty: qty,
      },
    });

  const calculateProductPrice = ({
    product,
  }: {
    product: productListingDummyDataTypes;
  }) => {
    const result = Number(product.qty) * Number(product.price);
    return result.toFixed(2);
  };

  return (
    <ul
      key={item.id}
      className="list-none flex gap-2 items-center border-b-2 border-gray-200 pb-2 mb-2"
    >
      <li className="flex-[2]">
        <div className="flex items-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => {
              cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: {
                  id: item.id,
                },
              });
            }}
          >
            <MdOutlineCancel />
          </span>
          <div className="flex items-start md:items-center gap-2 flex-col md:flex-row ">
            <img
              src={item.image}
              alt={item.name}
              className="w-[50px] h-[50px]"
            />
            <p>{item.name}</p>
          </div>
        </div>
      </li>
      <li className="flex-1 text-gray-500 font-[500]">${item.price}</li>
      <li className="flex-1">
        <div className="flex gap-1 items-center py-2 border border-gray-200 rounded-3xl justify-center w-[100px]">
          <button
            className="px-2"
            onClick={() =>
              changeProductQty({
                id: item.id,
                qty: Number(item.qty) - 1,
              })
            }
          >
            -
          </button>
          <p className=" border-x-2 px-2 w-[40px] text-center border-gray-300">
            {item.qty}
          </p>
          <button
            className="px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              changeProductQty({
                id: item.id,
                qty: Number(item.qty) + 1,
              })
            }
            disabled={Number(item.qty) + 1 > Number(item.stock)}
          >
            +
          </button>
        </div>
      </li>
      <li className="flex-1 font-semibold text-[#318CEF]">
        $
        {calculateProductPrice({
          product: item,
        })}
      </li>
    </ul>
  );
};
