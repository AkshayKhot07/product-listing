import { productSize, productType } from "../../constants/data";
import useProductList from "../../hooks/useProductList";
import "./Filter.css"
import { RxReset } from "react-icons/rx"
import { Link } from "react-router-dom";


const Filter = () => {
  const { sortFilterDispatch, sortFilterState, cartDispatch, cartState } = useProductList()

  return (
    <div className="filter-wrapper">
      <div className="type-size-reset-container">
        {" "}
        <div>
          <label className="form-label"></label>
          <select
            className="form-input capitalize border-2 border-gray-400 rounded-md"
            name="type"
            value={sortFilterState.byType}
            onChange={(e) => {
              sortFilterDispatch({
                type:"FILTER_BY_TYPE",
                payload: e.target.value
              })
            }}
          >
            <option value="" disabled>
              Select a type
            </option>
            {productType?.map((item) => (
              <option value={item}
              style={{
                textTransform: "capitalize"
              }}
              >{item}</option>
            ))}
          </select>
        </div>



        <div>
          <label className="form-label"></label>
          <select
            className="form-input capitalize border-2 border-gray-400 rounded-md"
            name="size"
            style={{
                textTransform: "capitalize"
              }}
            value={sortFilterState.bySize}
            onChange={(e) => {
              sortFilterDispatch({
                type:"FILTER_BY_SIZE",  
                payload: e.target.value
              })
            }}
            
          >
            <option value="" disabled>
              Select a size
            </option>
            {productSize?.map((item) => (
              <option value={item}
              style={{
                textTransform: "capitalize"
              }}
              >{item}</option>
            ))}
          </select>
        </div>

        <div className="reset-conatiner hover:opacity-80"
        onClick={()=> {
          sortFilterDispatch({
            type:"CLEAR_FILTERS"
          })
        }}
        >
            <RxReset style={{
                color:"#318CE7",
                fontWeight:"bold",
                fontSize:"20px"
            }} />
            <p className="reset-btn">Reset</p>
        </div>
      </div>
 

      <div className="search-addtocart-container">
        <div className="search-input">
            <label htmlFor="search">Search:</label>
            <input 
            value={sortFilterState.searchQuery}
            placeholder="Search by name"
            onChange={(e) => {
              sortFilterDispatch({
                type:"FILTER_BY_SEARCH",
                payload: e.target.value
              })
            }}
            type="text" className="border-2 border-gray-400 rounded-md bg-gray-200 px-2" name="search" id="search" />
        </div>

        <div className="reset-conatiner hover:opacity-80"
        onClick={()=> {
          cartDispatch({
            type:"CLEAR_CART"
          })
        }}
        >
            <RxReset style={{
                color:"#318CE7",
                fontWeight:"bold",
                fontSize:"20px"
            }} />
            <p className="reset-btn ">Unselect Products</p>
        </div>

        <div className="submit-button-container">
          <Link to={"/product-summary"}>
            <button className="submit-button add-to-cart-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" type="button"
            disabled={cartState.cart.length > 0 ? false : true}
            >
              Add To Cart
            </button>
              </Link>
          </div>
      </div>
    </div>
  );
};

export default Filter;
