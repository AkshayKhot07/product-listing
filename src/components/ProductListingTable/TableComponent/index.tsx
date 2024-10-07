import IonIcon from "@reacticons/ionicons";
import classNames from "classnames";
import { ChangeEvent, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import SkeletonLoader from "./SkeletonLoader";
import SmallLoader from "./SmallLoader";

export interface Field {
  key: string;
  label: string | any;
  align?: "center" | "left" | "right";
  render?: (value: any, item: any) => React.ReactNode;
  sort?: boolean;
  width?: number;
  inputCheckbox?: boolean;
  headerClass: string;
}

export interface SortedKeyProps {
  key: string;
  order: string;
}

export enum SortOrder {
  DESC = "DESC",
  ASC = "ASC",
}

type TableComponentProps<T> = {
  fields: Field[];
  columns: T[];
  onRowClick?: (item: T) => void;
  handleSortClick?: (sortkey: string) => void;
  sortedKey?: SortedKeyProps;
  isLoading: boolean;
  pageSize?: number;
  selectAll?: (e: ChangeEvent<HTMLInputElement>) => void;
  currPageSelectAll?: string[];
};

const TableComponent = <T extends Record<string, any>>({
  fields,
  columns,
  onRowClick,
  handleSortClick,
  sortedKey,
  isLoading,
  pageSize,
  selectAll,
  currPageSelectAll,
}: TableComponentProps<T>) => {
  const inputSelectAllRef = useRef<HTMLInputElement>(null);
  const [sortLoaderKey, setSortLoaderKey] = useState("");

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-fixed min-w-full tableComponent">
        <colgroup>
          {fields.map((item) => {
            return <col key={item?.label}></col>;
          })}
        </colgroup>

        <thead className="bg-gray-200 text-text-2 rounded-md border border-b-text-3">
          <tr className="min-h-[50px] h-[50px] max-h-[50px]">
            {fields.map((item) => {
              return (
                <th
                  key={item.key as string}
                  className={classNames(
                    "p-4 whitespace-nowrap",
                    item.headerClass,
                    {
                      "text-left": item.align === "left",
                      "text-center": item.align === "center",
                      "text-right": item.align === "right",
                    }
                  )}
                >
                  {item.sort && item.inputCheckbox ? (
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          ref={inputSelectAllRef}
                          checked={
                            currPageSelectAll &&
                            currPageSelectAll.length === pageSize &&
                            pageSize !== 0
                          }
                          onChange={(e) => selectAll && selectAll(e)}
                          className="accent-primary w-4 h-4 rounded"
                        />
                        <span className="">{item.label}</span>
                      </div>

                      <div
                        className={classNames(
                          "w-7 h-7 flex items-center justify-center",
                          item.sort ? "cursor-pointer" : ""
                        )}
                        onClick={() => {
                          setSortLoaderKey(item.key);
                          if (item.sort && handleSortClick) {
                            handleSortClick(item.key);
                          }
                        }}
                      >
                        {isLoading && item.key === sortLoaderKey ? (
                          <SmallLoader />
                        ) : (
                          <span
                            className={classNames(
                              "transition-all transform",
                              sortedKey?.key === item.key &&
                                sortedKey?.order === SortOrder.DESC
                                ? "rotate-180"
                                : ""
                            )}
                          >
                            <IoFilter />
                          </span>
                        )}
                      </div>
                    </div>
                  ) : item.sort ? (
                    <div
                      className={classNames("flex gap-2 items-center ", {
                        "justify-start": item.align === "left",
                        "justify-center": item.align === "center",
                        "justify-end": item.align === "right",
                      })}
                    >
                      {item.label}
                      <div
                        className={classNames(
                          "w-7 h-7 flex items-center justify-center",
                          item.sort ? "cursor-pointer" : ""
                        )}
                        onClick={() => {
                          setSortLoaderKey(item.key);
                          if (item.sort && handleSortClick) {
                            handleSortClick(item.key);
                          }
                        }}
                      >
                        {isLoading && item.key === sortLoaderKey ? (
                          <SmallLoader />
                        ) : (
                          <span
                            className={classNames(
                              "transition-all transform",
                              sortedKey?.key === item.key &&
                                sortedKey?.order === SortOrder.DESC
                                ? "rotate-180"
                                : ""
                            )}
                          >
                             <IoFilter />
                          </span>
                        )}
                      </div>
                    </div>
                  ) : item.inputCheckbox ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        ref={inputSelectAllRef}
                        checked={
                          currPageSelectAll &&
                          currPageSelectAll.length === pageSize &&
                          pageSize !== 0
                        }
                        onChange={(e) => selectAll && selectAll(e)}
                        className="accent-primary w-4 h-4 rounded"
                      />
                      <span className="">{item.label}</span>
                    </div>
                  ) : (
                    <div className="">{item.label}</div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        {isLoading ? (
          <SkeletonLoader tableFields={fields?.length} />
        ) : (
          <tbody>
            {columns?.length > 0 ? (
              columns.map((item, index) => (
                <tr
                  key={index}
                  className="border-b group border-background-6"
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {fields.map((field) => (
                    <td
                      key={field.key as string}
                      className={classNames(
                        field.headerClass,
                        `whitespace-normal text-sm font-normal px-1 transition-all ease-in-out duration-150 group-hover:bg-background-5 bg-background-1 `
                      )}
                    >
                      {field.render
                        ? field.render(item[field.key], item)
                        : item[field.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="row-auto">
                <td colSpan={fields?.length} className="text-center  h-[40vh]">
                  {/* <DataNotFound /> */}
                  <div className="flex flex-col justify-center items-center">
                    <IonIcon name="file-tray-outline" size="large" />
                    {"No Data found"}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableComponent;
