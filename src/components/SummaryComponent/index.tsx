import SummaryProductList from "./SummaryProductList"

const SummaryComponent = () => {


    return (
        <div className="flex gap-2">
            <div className="flex-[2]">

            <SummaryProductList />
            </div>
            <div className="flex-1 border border-gray-500">
                Cart Totals
            </div>
        </div>
    )
}

export default SummaryComponent