import { productSize, productType } from "../../constants/data";
import useProductList from "../../hooks/useProductList";
import { RxReset } from "react-icons/rx";
import { Link } from "react-router-dom";

const Filter = () => {
  const { sortFilterDispatch, sortFilterState, cartDispatch, cartState } =
    useProductList();

  return (
    <div className="py-[10px] flex flex-col items-start md:items-center gap-2 justify-between lg:flex-row">
      <div className="flex items-center justify-between gap-[5px]">
        {" "}
        <div>
          <label className="form-label"></label>
          <select
            className="form-input capitalize border-2 border-gray-400 rounded-md"
            name="type"
            value={sortFilterState.byType}
            onChange={(e) => {
              sortFilterDispatch({
                type: "FILTER_BY_TYPE",
                payload: e.target.value,
              });
            }}
          >
            <option value="" disabled>
              Select a type
            </option>
            {productType?.map((item) => (
              <option
                value={item}
                style={{
                  textTransform: "capitalize",
                }}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label"></label>
          <select
            className="form-input capitalize border-2 border-gray-400 rounded-md"
            name="size"
            style={{
              textTransform: "capitalize",
            }}
            value={sortFilterState.bySize}
            onChange={(e) => {
              sortFilterDispatch({
                type: "FILTER_BY_SIZE",
                payload: e.target.value,
              });
            }}
          >
            <option value="" disabled>
              Select a size
            </option>
            {productSize?.map((item) => (
              <option
                value={item}
                style={{
                  textTransform: "capitalize",
                }}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer hover:opacity-80"
          onClick={() => {
            sortFilterDispatch({
              type: "CLEAR_FILTERS",
            });
          }}
        >
          <RxReset
            style={{
              color: "#318CE7",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          />
          <p className="text-[#318CE7] font-bold text-sm">Reset</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-col  md:flex-row">
        <div className="flex gap-2 items-center justify-between">
          <div className="search-input flex items-center">
            <label
              htmlFor="search"
              className="text-gray-700 text-sm font-bold mr-[5px] hidden md:block"
            >
              Search:
            </label>
            <input
              value={sortFilterState.searchQuery}
              placeholder="Search by name"
              onChange={(e) => {
                sortFilterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
              type="text"
              className="border-2 border-gray-400 rounded-md bg-gray-200 px-2"
              name="search"
              id="search"
            />
          </div>
          <div>
            <div
              className="flex items-center cursor-pointer gap-1 hover:opacity-80"
              onClick={() => {
                cartDispatch({
                  type: "CLEAR_CART",
                });
              }}
            >
              <RxReset
                style={{
                  color: "#318CE7",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              />
              <p className="text-[#318CE7] font-bold text-sm">
                Unselect Products
              </p>
            </div>
          </div>
        </div>

        <div className="reset-submit-wrapper flex items-center gap-[15px] w-full md:w-fit">
          <div className="submit-button-container w-full md:w-fit">
            <Link to={"/product-summary"}>
              <button
                className="submit-button w-full md:w-fit bg-[#318CE7] border-none text-white text-sm font-bold py-[5px] px-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={cartState.cart.length > 0 ? false : true}
              >
                Add To Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
