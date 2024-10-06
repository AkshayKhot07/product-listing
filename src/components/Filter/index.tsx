import { productSize, productType } from "../../constants/data";
import useProductList from "../../hooks/useProductList";
import "./Filter.css"
import { RxReset } from "react-icons/rx"
import { Link } from "react-router-dom";


const Filter = () => {
  const { sortFilterDispatch, sortFilterState, cartDispatch, cartState } = useProductList()

  console.log("sortFilterState", sortFilterState)


  return (
    <div className="filter-wrapper">
      <div className="type-size-reset-container">
        {" "}
        <div>
          <label className="form-label"></label>
          <select
            className="form-input"
            name="type"
            style={{
                textTransform: "capitalize"
              }}
            //   value={formData.category}
            //   onChange={handleChange}
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
          {/* {errors.category && (
              <span className="error-message">{errors.category}</span>
            )} */}
        </div>



        <div>
          <label className="form-label"></label>
          <select
            className="form-input"
            name="size"
            style={{
                textTransform: "capitalize"
              }}
            //   value={formData.category}
            //   onChange={handleChange}
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
          {/* {errors.category && (
              <span className="error-message">{errors.category}</span>
            )} */}
        </div>

        <div className="reset-conatiner"
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
            type="text" className="border border-gray-400" name="search" id="search" />
        </div>

        <div className="reset-conatiner"
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
            <p className="reset-btn">Unselect Products</p>
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
