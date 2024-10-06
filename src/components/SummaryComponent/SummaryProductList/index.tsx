import useProductList from "../../../hooks/useProductList";

const SummaryProductList = () => {
  const { cartState } = useProductList();

  return (
    <div className="summary-container">
      <ul className="list-none flex gap-2">
        <li className="flex-[2]">Product</li>
        <li className="flex-1">Price</li>
        <li className="flex-1">Quantity</li>
        <li className="flex-1">SubTotal</li>
      </ul>

      {cartState?.cart?.map((item) => {
        return (
          <ul key={item.id} className="list-none flex gap-2">
            <li className="flex-[2]">{item.name}</li>
            <li className="flex-1">{item.price}</li>
            <li className="flex-1">{item.qty}</li>
            <li className="flex-1">{item.price}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default SummaryProductList;
