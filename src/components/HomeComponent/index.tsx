import useProductList from "../../hooks/useProductList";
import Filter from "../Filter";
import ProductListingTable from "../ProductListingTable";

const HomeComponent = () => {
  const { cartState } = useProductList();

  console.log("cartState", cartState);

  

  return (
    <div>
<Filter />
<ProductListingTable />

    </div>
  );
};

export default HomeComponent;
