import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TableComponent, { Field, SortOrder } from "./TableComponent";
import { FaShoppingCart } from "react-icons/fa";
import useProductList from "../../hooks/useProductList";
import { productListingDummyDataTypes } from "../../constants/data";
import classNames from "classnames";

const ProductListingTable = () => {
  const { cartState, sortFilterState, sortFilterDispatch, cartDispatch } =
    useProductList();
    const [loading, setLoading] = useState(false);

    //useEffect to simulate loading state
    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500); 
      return () => clearTimeout(timer);
    }, [sortFilterState]);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const modifiedProducts = useMemo(() => {
    let modifiedProductsData = [...cartState.products];

    if (sortFilterState.bySort.key && sortFilterState.bySort.order) {
      if (sortFilterState.bySort.key === "color") {
        modifiedProductsData = modifiedProductsData.sort((a, b) =>
          sortFilterState.bySort.order === "DESC"
            ? b.color.localeCompare(a.color)
            : a.color.localeCompare(b.color)
        );
      }

      if (sortFilterState.bySort.key === "inStock") {
        modifiedProductsData = modifiedProductsData.sort((a, b) => {
          const aStock = a.inStock ? 1 : 0;
          const bStock = b.inStock ? 1 : 0;
          return sortFilterState.bySort.order === "DESC"
            ? bStock - aStock
            : aStock - bStock;
        });
      }
      if (sortFilterState.bySort.key === "price") {
        modifiedProductsData = modifiedProductsData.sort((a, b) => {
          return sortFilterState.bySort.order === "DESC"
            ? b.price - a.price
            : a.price - b.price;
        });
      }
    }

    if (sortFilterState.bySize) {
      modifiedProductsData = modifiedProductsData.filter((item) => {
        if (sortFilterState.bySize === "small") {
          return item.size === "small";
        }
        if (sortFilterState.bySize === "medium") {
          return item.size === "medium";
        }
        if (sortFilterState.bySize === "large") {
          return item.size === "large";
        }
        return true;
      });
    }

    if (sortFilterState.byType) {
      modifiedProductsData = modifiedProductsData.filter((item) => {
        if (sortFilterState.byType === "hoodie") {
          return item.type === "hoodie";
        }
        if (sortFilterState.byType === "t-shirt") {
          return item.type === "t-shirt";
        }
        if (sortFilterState.byType === "shirt") {
          return item.type === "shirt";
        }
        return true;
      });
    }

    if (sortFilterState.searchQuery) {
      const searchQueryNormalized = sortFilterState.searchQuery
        .toLowerCase()
        .replace(/[\s-]+/g, "");

      modifiedProductsData = modifiedProductsData.filter((item) => {
        const nameNormalized = item.name.toLowerCase().replace(/[\s-]+/g, "");
        return nameNormalized.includes(searchQueryNormalized);
      });
    }



    return modifiedProductsData;
  }, [
    cartState.products,
    sortFilterState.bySize,
    sortFilterState.bySort.key,
    sortFilterState.bySort.order,
    sortFilterState.byType,
    sortFilterState.searchQuery,
  ]);

  const [sortedKey, setSortedKey] = useState<{
    key: string;
    order: string;
  }>({
    key: sortFilterState.bySort.key || "",
    order:
      (sortFilterState.bySort.order === ""
        ? SortOrder.ASC
        : sortFilterState.bySort.order) || SortOrder.ASC,
  });

  //Sorting table
  const handleSortClick = (key: string) => {
    setSortedKey((prevSortedKey) => {
      const newSortedKey = {
        key: key === prevSortedKey.key ? prevSortedKey.key : key,
        order:
          prevSortedKey.key === key
            ? prevSortedKey.order === SortOrder.DESC
              ? SortOrder.ASC
              : SortOrder.DESC
            : SortOrder.DESC,
      };

      sortFilterDispatch({
        type: "SORT_BY",
        payload: newSortedKey,
      });

      return newSortedKey;
    });
  };

  console.log("sortedKey", sortedKey);

  useEffect(() => {
    if (sortFilterState.bySort.key === "") {
      setSortedKey({
        key: "",
        order: "",
      });
    }
  }, [sortFilterState.bySort]);

  const handelCheckboxInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: productListingDummyDataTypes
  ) => {
    if (e.target.checked) {
      cartDispatch({
        type: "ADD_TO_CART",
        payload: {
          ...item,
          qty: item.qty ? item.qty : 1,
        },
      });
    } else {
      cartDispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: productListingDummyDataTypes
  ) => {
    const enteredQty = Number(e.target.value);

    if (enteredQty > item.stock) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [item.id]: `Stock has a total of ${item.stock} items only.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [item.id]: "",
      }));

      // Check if the item is already in the cart to update the quantity
      if (cartState.cart.some((i) => i.id === item.id)) {
        cartDispatch({
          type: "CHANGE_CART_QTY",
          payload: {
            id: item.id,
            qty: enteredQty,
          },
        });
      } else {
        cartDispatch({
          type: "ADD_TO_CART",
          payload: {
            ...item,
            qty: enteredQty,
          },
        });
      }
    }
  };

  const fields: Field[] = [
    {
      key: "image",
      label: "Image",
      render: (_, item) => (
        <div className="flex justify-start">
          <img
            className="w-[100px] h-[100px]"
            src={item.image}
            alt={item.name}
          />
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
      align: "left",
    },
    {
      key: "name",
      label: "Name",
      render: (value) => (
        <div>
          <p className="text-[#318CEF] font-semibold">{value}</p>
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
      align: "left",
    },
    {
      key: "color",
      label: "Color",
      render: (value) => (
        <div>
          <p className="capitalize text-[#318CEF] font-semibold">{value}</p>
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
      align: "left",
      sort: true,
    },
    {
      key: "inStock",
      label: "Stock",
      render: (value) => (
        <div>
          <p 
          className={classNames(
            value? "text-green-500 font-semibold":"text-red-500 font-semibold"
          )}
          >{value ? "In Stock" : "Not In Stock"}</p>
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
      align: "left",
      sort: true,
    },
    {
      key: "price",
      label: "Price",
      render: (value) => (
        <div>
          <p className="text-gray-500 font-semibold">${value}</p>
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
      align: "left",
      sort: true,
    },
    {
      key: "",
      label: "Buy",
      render: (_, item) => (
        <div className="flex flex-col mt-2">
          <div className="flex items-center justify-center gap-1">
            <div>
              <input
                type="text"
                value={cartState.cart.find((i) => i.id === item.id)?.qty || ""}
                className="w-[50px] py-[6px] bg-gray-200 text-center"
                onChange={(e) => handleInputChange(e, item)}
              />
            </div>
            <div className="bg-gray-900 py-2 px-3">
              <FaShoppingCart className="text-white" />
            </div>
            {
              <div className="py-2 px-3">
                {item.stock > 0 && (
                  <input
                    type="checkbox"
                    checked={cartState.cart.some((i) => i.id === item.id)}
                    onChange={(e) => {
                      handelCheckboxInputChange(e, item);
                    }}
                  />
                )}
              </div>
            }
          </div>
          <div className="">
            {errors[item.id] ? (
              <p className="text-red-500 text-[10px] !font-[10px]">
                {errors[item.id]}
              </p>
            ) : (
              <p className="h-[20px]"></p>
            )}
          </div>
        </div>
      ),
      headerClass: "!min-w-[130px] !max-w-[130px]",
    },
  ];

  return (
    <div className="product-listing-table">
      <TableComponent
        isLoading={loading}
        fields={fields}
        columns={modifiedProducts || []}
        handleSortClick={handleSortClick}
        sortedKey={sortedKey}
      />
    </div>
  );
};

export default ProductListingTable;
